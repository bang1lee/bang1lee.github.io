"""로깅 유틸리티"""

import logging
import sys
from typing import Optional


def setup_logger(
    name: str = "orchestrator",
    level: int = logging.INFO,
    log_file: Optional[str] = None,
) -> logging.Logger:
    """구조화된 로거 설정"""
    logger = logging.getLogger(name)
    logger.setLevel(level)

    if logger.handlers:
        return logger

    fmt = logging.Formatter(
        "[%(asctime)s] %(levelname)s [%(name)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    console = logging.StreamHandler(sys.stdout)
    console.setFormatter(fmt)
    logger.addHandler(console)

    if log_file:
        fh = logging.FileHandler(log_file)
        fh.setFormatter(fmt)
        logger.addHandler(fh)

    return logger
