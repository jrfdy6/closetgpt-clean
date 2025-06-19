from pydantic import BaseModel

class WeatherData(BaseModel):
    temperature: float
    condition: str
    humidity: float
    wind_speed: float
    location: str
    precipitation: float = 0.0

# Export types for use in other backend modules
__all__ = ['WeatherData'] 