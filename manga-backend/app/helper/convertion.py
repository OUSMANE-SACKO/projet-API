# Fonction helper pour convertir en datetime si nécessaire
from datetime import datetime
def ensure_datetime(date_value):
    if isinstance(date_value, str):
        try:
            return datetime.fromisoformat(date_value.rstrip('Z'))
        except ValueError:
            # Si fromisoformat échoue, essayons avec strptime
            return datetime.strptime(date_value, "%Y-%m-%dT%H:%M:%S.%fZ")
    elif isinstance(date_value, datetime):
        return date_value
    else:
        raise ValueError(f"Format de date non pris en charge : {type(date_value)}")