using React.Dotnet.Api.Models;

namespace React.Dotnet.Api.Interfaces
{
    public interface IWeatherForecastController : IBaseController
    {
        IEnumerable<WeatherForecast> Get();
    }
}
