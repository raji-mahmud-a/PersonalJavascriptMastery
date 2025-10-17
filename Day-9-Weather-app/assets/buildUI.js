const populateWeatherUI = function(location, data) {
            const bodym = document.getElementById('main');
            
            // Helper function to get weather icon
            function getWeatherIcon(code, isDay) {
                const icons = {
                    0: isDay ? 'fa-sun' : 'fa-moon',
                    1: isDay ? 'fa-sun' : 'fa-moon',
                    2: 'fa-cloud-sun',
                    3: 'fa-cloud',
                    45: 'fa-smog',
                    48: 'fa-smog',
                    51: 'fa-cloud-rain',
                    53: 'fa-cloud-rain',
                    55: 'fa-cloud-showers-heavy',
                    61: 'fa-cloud-rain',
                    63: 'fa-cloud-showers-heavy',
                    65: 'fa-cloud-showers-heavy',
                    71: 'fa-snowflake',
                    73: 'fa-snowflake',
                    75: 'fa-snowflake',
                    77: 'fa-snowflake',
                    80: 'fa-cloud-sun-rain',
                    81: 'fa-cloud-showers-heavy',
                    82: 'fa-cloud-showers-heavy',
                    85: 'fa-snowflake',
                    86: 'fa-snowflake',
                    95: 'fa-bolt',
                    96: 'fa-bolt',
                    99: 'fa-bolt'
                };
                return icons[code] || 'fa-cloud';
            }

            function formatTime(isoString) {
                const date = new Date(isoString);
                return date.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                });
            }

            // Generate hourly forecast HTML
            function generateHourlyForecast() {
                return data.hourly.times.slice(0, 12).map((time, i) => {
                    const temp = data.hourly.temperatures[i];
                    const precip = data.hourly.precipitationProbability[i];
                    const icon = getWeatherIcon(data.hourly.weatherCodes[i], true);
                    const hour = formatTime(time);
                    
                    return `
                        <div class="flex-shrink-0 text-center min-w-[90px]">
                            <div class="text-white text-sm mb-2">${hour}</div>
                            <i class="fas ${icon} text-yellow-300 text-3xl mb-2"></i>
                            <div class="text-white text-xl font-semibold mb-1">${temp}°</div>
                            <div class="text-white text-xs flex items-center justify-center gap-1">
                                <i class="fas fa-droplet text-blue-300"></i>
                                <span>${precip}%</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            // Generate daily forecast HTML
            function generateDailyForecast() {
                return data.daily.map((day, i) => {
                    const icon = getWeatherIcon(day.weatherCode, true);
                    return `
                        <div class="flex items-center justify-between text-white py-2 ${i > 0 ? 'border-t border-white/20' : ''}">
                            <div class="w-24 text-left font-medium">${day.dayName}</div>
                            <div class="flex items-center gap-3 flex-1">
                                <div class="flex items-center gap-1">
                                    <i class="fas fa-droplet text-blue-300 text-sm"></i>
                                    <span class="text-sm">${day.precipitationProbability}%</span>
                                </div>
                                <i class="fas ${icon} text-yellow-400 text-2xl"></i>
                            </div>
                            <div class="text-right">
                                <span class="font-semibold text-lg">${day.high}°</span> 
                                <span class="text-white/70">${day.low}°</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            // Render main UI
            bodym.innerHTML = `
                <!-- Header -->
                <header class="flex items-center justify-between mb-6 pt-4">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-map-marker-alt text-white text-2xl"></i>
                        <h1 class="text-white text-3xl font-semibold">${location.City}</h1>
                    </div>
                </header>

                <!-- Main Weather Card -->
                <div class="glass-card rounded-3xl p-8 mb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-white text-8xl font-bold mb-2">${data.current.temperature}°</div>
                            <div class="text-white text-3xl mb-4">${data.current.weatherDescription}</div>
                       
                        </div>
                    <div class="flex flex-col space-x-4 items-center justify-between h-full">
                        <div class="text-right">
                            <i class="fas ${getWeatherIcon(data.current.weatherCode, data.current.isDay)} text-yellow-300 text-7xl"></i>
                        </div>
                             <div class="text-white text-xl space-y-1">
                                <div>
                                    <i class="fas fa-arrow-up"></i>${data.today.high}° / 
                                    <i class="fas fa-arrow-down"></i>${data.today.low}°
                                </div>
                                <div class="text-lg">Feels like ${data.current.feelsLike}°</div>
                            </div>
                            </div>
                    </div>
                </div>

                <!-- Hourly Forecast -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <h2 class="text-white text-xl font-semibold mb-4">Hourly Forecast</h2>
                    <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                        ${generateHourlyForecast()}
                    </div>
                </div>

                <!-- Precipitation Chart -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <h2 class="text-white text-xl font-semibold mb-4">Precipitation (mm)</h2>
                    <canvas id="precipChart" height="150"></canvas>
                </div>

                <!-- Temperature Chart -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <h2 class="text-white text-xl font-semibold mb-4">Temperature Trend</h2>
                    <canvas id="tempChart" height="150"></canvas>
                </div>

                <!-- Sunrise & Sunset -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <div class="flex justify-between items-center text-white mb-4">
                        <div class="text-center">
                            <i class="fas fa-sun text-yellow-300 text-3xl mb-2"></i>
                            <div class="text-sm opacity-80">Sunrise</div>
                            <div class="text-2xl font-bold">${formatTime(data.today.sunrise)}</div>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-moon text-blue-200 text-3xl mb-2"></i>
                            <div class="text-sm opacity-80">Sunset</div>
                            <div class="text-2xl font-bold">${formatTime(data.today.sunset)}</div>
                        </div>
                    </div>
                </div>

                <!-- Weather Details Grid -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <!-- Humidity -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-droplet text-blue-300 text-xl"></i>
                            <span class="text-white/80 text-sm">Humidity</span>
                        </div>
                        <div class="text-white text-5xl font-bold mb-3">${data.current.humidity}%</div>
                        <div class="relative h-2 bg-white/20 rounded-full overflow-hidden">
                            <div class="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style="width: ${data.current.humidity}%;"></div>
                        </div>
                    </div>

                    <!-- Wind -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-wind text-white text-xl"></i>
                            <span class="text-white/80 text-sm">Wind Speed</span>
                        </div>
                        <div class="text-white text-4xl font-bold mb-1">${data.current.windSpeed}</div>
                        <div class="text-white text-lg">km/h</div>
                        <div class="text-white/80 text-sm mt-2">${data.current.windDirectionCardinal}</div>
                    </div>

                    <!-- Pressure -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-gauge text-white text-xl"></i>
                            <span class="text-white/80 text-sm">Pressure</span>
                        </div>
                        <div class="text-white text-4xl font-bold mb-1">${data.current.pressure}</div>
                        <div class="text-white text-lg">hPa</div>
                    </div>

                    <!-- Visibility -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-eye text-white text-xl"></i>
                            <span class="text-white/80 text-sm">Visibility</span>
                        </div>
                        <div class="text-white text-4xl font-bold mb-1">${data.current.visibility}</div>
                        <div class="text-white text-lg">km</div>
                    </div>

                    <!-- UV Index -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-sun text-yellow-300 text-xl"></i>
                            <span class="text-white/80 text-sm">UV Index</span>
                        </div>
                        <div class="text-white text-5xl font-bold mb-1">${data.today.uvIndex}</div>
                        <div class="text-white/80 text-sm">
                            ${data.today.uvIndex <= 2 ? 'Low' : data.today.uvIndex <= 5 ? 'Moderate' : data.today.uvIndex <= 7 ? 'High' : 'Very High'}
                        </div>
                    </div>

                    <!-- Cloud Cover -->
                    <div class="glass-card rounded-3xl p-6">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-cloud text-white text-xl"></i>
                            <span class="text-white/80 text-sm">Cloud Cover</span>
                        </div>
                        <div class="text-white text-5xl font-bold mb-1">${data.current.cloudCover}%</div>
                    </div>
                </div>

                <!-- Moon Phase -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <div class="text-center">
                        <i class="fas fa-moon text-blue-200 text-5xl mb-3"></i>
                        <div class="text-white text-2xl font-semibold">${data.moon}</div>
                    </div>
                </div>

                <!-- 7-Day Forecast -->
                <div class="glass-card rounded-3xl p-6 mb-4">
                    <h2 class="text-white text-2xl font-semibold mb-4">7-Day Forecast</h2>
                    <div class="space-y-1">
                        ${generateDailyForecast()}
                    </div>
                </div>

                <!-- Weather Data Table -->
                <div class="glass-card rounded-3xl p-6 mb-4 overflow-x-auto">
                    <h2 class="text-white text-2xl font-semibold mb-4">Detailed Weather Data</h2>
                    <table class="w-full text-white">
                        <thead>
                            <tr class="border-b border-white/30">
                                <th class="text-left py-3 px-2 font-semibold">Parameter</th>
                                <th class="text-right py-3 px-2 font-semibold">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Temperature</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.temperature}°C</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Feels Like</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.feelsLike}°C</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Humidity</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.humidity}%</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Wind Speed</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.windSpeed} km/h</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Wind Direction</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.windDirectionCardinal} (${data.current.windDirection}°)</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Pressure</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.pressure} hPa</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Visibility</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.visibility} km</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Cloud Cover</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.cloudCover}%</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">Precipitation</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.current.precipitation} mm</td>
                            </tr>
                            <tr class="border-b border-white/20">
                                <td class="py-3 px-2">UV Index</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.today.uvIndex}</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-2">Location</td>
                                <td class="text-right py-3 px-2 font-semibold">${data.location.latitude.toFixed(4)}, ${data.location.longitude.toFixed(4)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            
            document.getElementById('footerM').innerHTML = `
  <div class="text-center text-white/60 text-sm py-1">
                    <p>Weather data from Open-Meteo </br> Last updated: ${new Date(data.current.time).toLocaleString()}</p>
                    <p class="mt-1">Timezone: ${data.location.timezone}</p>
                </div>
  `

            // Create Precipitation Chart
            const precipCtx = document.getElementById('precipChart').getContext('2d');
            new Chart(precipCtx, {
                type: 'bar',
                data: {
                    labels: data.hourly.times.slice(0, 12).map(t => formatTime(t)),
                    datasets: [{
                        label: 'Precipitation (mm)',
                        data: data.hourly.precipitation.slice(0, 12),
                        backgroundColor: 'rgba(96, 165, 250, 0.7)',
                        borderColor: 'rgba(96, 165, 250, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'white'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: 'white'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });

            // Create Temperature Chart
            const tempCtx = document.getElementById('tempChart').getContext('2d');
            new Chart(tempCtx, {
                type: 'line',
                data: {
                    labels: data.hourly.times.slice(0, 24).map(t => formatTime(t)),
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: data.hourly.temperatures.slice(0, 24),
                        borderColor: 'rgb(251, 191, 36)',
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: 'white'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: 'white',
                                maxRotation: 45,
                                minRotation: 45
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });
        };
        
export default populateWeatherUI