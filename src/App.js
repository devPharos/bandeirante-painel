import {
  ArrowBigRight,
  Clock,
  LayoutTemplate,
  ListChecks,
  MoveRight,
} from 'lucide-react'
import logo from './assets/logo.png'
export default function App() {
  return (
    <div className="container">
      <main className="content">
        <section className="board">
          <header className="header">
            <ListChecks size={30} />
            <span className="title">SEPARAÇÃO DE PEDIDOS</span>
          </header>

          <main className="board-content">
            <div className="board-row">
              <section id="board-card" className="in-progress">
                <span className="card-title">127312</span>
                <div className="card-content">
                  <span className="card-info-title">CENTRO REAL</span>
                  <div className="card-info">
                    <span>05/01/2024</span> - <span>08:15</span>
                  </div>
                </div>
                <span className="card-quantity">45 CX.</span>
              </section>

              <span id="badge" className="in-progress">
                Jefferson Melo
              </span>

              <span className="data">35%</span>
            </div>

            <div className="board-row">
              <section id="board-card" className="to-do">
                <span className="card-title">127312</span>
                <div className="card-content">
                  <span className="card-info-title">CENTRO REAL</span>
                  <div className="card-info">
                    <span>05/01/2024</span> - <span>08:15</span>
                  </div>
                </div>
                <span className="card-quantity">45 CX.</span>
              </section>

              <span id="badge" className="to-do">
                Não iniciado
              </span>

              <span className="data"></span>
            </div>
          </main>

          <div className="board-footer">
            <section className="quantity-badge">
              <span>+3</span>
            </section>
          </div>
        </section>

        <section className="board">
          <header className="header">
            <LayoutTemplate size={30} />
            <span className="title">REABASTECIMENTO PICKING</span>
          </header>

          <main className="board-content">
            <section className="picking-card">
              <header>
                <div className="picking-card-info">
                  <span>E6501</span>
                </div>
                <div className="picking-card-info">
                  <span className="picking-code">7360081E</span>
                </div>
                <div className="picking-card-info">
                  <span>A2400</span>
                </div>
              </header>

              <main>
                <div className="picking-card-info">
                  <span>30</span>
                </div>

                <div className="picking-card-info">
                  <MoveRight size={28} />
                </div>

                <div className="picking-card-info">
                  <span>4</span>
                </div>
              </main>
            </section>
          </main>
        </section>
      </main>

      <footer className="footer">
        <section className="time">
          <Clock />
          <span className="time-info">10:35</span>
        </section>
        <img src={logo} alt="logo" className="logo" />
      </footer>
    </div>
  )
}
