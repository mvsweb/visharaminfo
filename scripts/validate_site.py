#!/usr/bin/env python3
"""Validate critical Vtechiee static-site files without external dependencies."""

from __future__ import annotations

import json
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        for name in ("src", "href"):
            value = attributes.get(name)
            if value:
                self.references.append((tag, value))


def fail(message: str) -> None:
    ERRORS.append(message)


def validate_html(path: Path) -> None:
    if not path.exists():
        fail(f"Missing HTML file: {path.relative_to(ROOT)}")
        return

    text = path.read_text(encoding="utf-8")
    parser = AssetParser()
    try:
        parser.feed(text)
        parser.close()
    except Exception as exc:  # pragma: no cover - defensive CI reporting
        fail(f"Unable to parse {path.name}: {exc}")
        return

    if "<title>" not in text or "</title>" not in text:
        fail(f"{path.name} is missing a title")

    for tag, reference in parser.references:
        parsed = urlsplit(reference)
        if parsed.scheme or parsed.netloc or reference.startswith(("#", "mailto:", "tel:", "data:")):
            continue

        local_path = unquote(parsed.path)
        if local_path in ("", "/"):
            continue

        candidate = ROOT / local_path.lstrip("/")
        if not candidate.exists():
            fail(f"Broken local {tag} reference in {path.name}: {reference}")


def validate_json(path: Path) -> None:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"Invalid JSON in {path.relative_to(ROOT)}: {exc}")
        return

    for key in ("name", "short_name", "start_url", "theme_color"):
        if not data.get(key):
            fail(f"Manifest is missing required field: {key}")


def validate_xml(path: Path) -> None:
    try:
        root = ET.parse(path).getroot()
    except (OSError, ET.ParseError) as exc:
        fail(f"Invalid XML in {path.relative_to(ROOT)}: {exc}")
        return

    locations = [element.text for element in root.iter() if element.tag.endswith("loc")]
    if "https://vtechiee.com/" not in locations:
        fail("sitemap.xml does not include https://vtechiee.com/")


def validate_content() -> None:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    script = (ROOT / "js" / "vtechiee-2026.js").read_text(encoding="utf-8")

    for name, text in {
        "index.html": index,
        "robots.txt": robots,
        "sitemap.xml": sitemap,
        "js/vtechiee-2026.js": script,
    }.items():
        if "visharaminfo.in" in text.lower():
            fail(f"Old domain reference found in {name}")

    required_index_values = (
        'rel="canonical" href="https://vtechiee.com/"',
        "support@vtechiee.com",
        'id="services"',
        'id="work"',
        'id="contact"',
    )
    for value in required_index_values:
        if value not in index:
            fail(f"index.html is missing required content: {value}")

    if "https://vtechiee.com/sitemap.xml" not in robots:
        fail("robots.txt does not advertise the Vtechiee sitemap")

    if "window.emailjs.sendForm" not in script:
        fail("Contact form EmailJS submission is missing")


def main() -> int:
    required_files = (
        "index.html",
        "404.html",
        "robots.txt",
        "sitemap.xml",
        "site.webmanifest",
        ".well-known/security.txt",
        "css/vtechiee-2026.css",
        "css/vtechiee-plus.css",
        "js/vtechiee-2026.js",
    )

    for relative in required_files:
        if not (ROOT / relative).exists():
            fail(f"Missing required file: {relative}")

    validate_html(ROOT / "index.html")
    validate_html(ROOT / "404.html")
    validate_json(ROOT / "site.webmanifest")
    validate_xml(ROOT / "sitemap.xml")
    validate_content()

    if ERRORS:
        print("Site validation failed:")
        for error in ERRORS:
            print(f" - {error}")
        return 1

    print("Site validation passed: HTML assets, metadata, sitemap and manifest are consistent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
