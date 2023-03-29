// import hotBg from '../assets/hot.jpg'
import coldBg from '../assets/cold.jpg'

export const App = () => {
  return (
    <div className="app" style={{ backgroundImage: `url(${coldBg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input type="text" className="" name='city' placeholder='Enter city...' />
            <button className="">°F</button>
          </div>
          <section className="secttion__temperature"></section>
          <div className="icon">
            <h3>London</h3>
            <div src='' alt='weatherIcon' className="img"></div>
            <h3>Cloudy</h3>
          </div>
          <div className="temperature">
            <h1>34 °C</h1>
          </div>
          {/* //TODO - bottom description */}
        </div>
      </div>
    </div>
  )
}
