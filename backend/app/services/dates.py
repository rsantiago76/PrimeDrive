from datetime import date

def parse_ymd(s: str) -> date:
    return date.fromisoformat(s)

def days_between(start: str, end: str) -> int:
    s = parse_ymd(start)
    e = parse_ymd(end)
    if e <= s:
        raise ValueError("end_date must be after start_date")
    return (e - s).days
