import {
  AlertTriangle,
  Clock,
  LayoutTemplate,
  ListChecks,
  MoveRight,
} from 'lucide-react'
import logo from './assets/logo.png'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'

export default function App() {
  const [date, setDate] = useState(format(new Date(), 'HH:mm'))
  const [requests, setRequests] = useState([])
  const [picking, setPicking] = useState([])
  const [error, setError] = useState(false)
  const cardsQuantity = 7

  const leftBoardData = useMemo(
    () => [
      {
        code: '123456',
        name: 'CENTRO REAL',
        date: new Date(),
        quantity: 45,
        status: 'Iniciado',
        responsible: 'Jefferson Melo',
        pct: 35,
      },
      {
        code: '123457',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 176,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '123458',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '123459',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '12349',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '1256',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '121156',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '12521326',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
      {
        code: '1244456',
        name: 'CENTRO REAL',
        date: new Date(2023, 1, 12),
        quantity: 46,
        status: 'NaoIniciado',
        responsible: 'Jefferson Melo',
      },
    ],
    [],
  )
  const rightBoardData = useMemo(
    () => [
      {
        leftCode: 'E6501',
        mainCode: '7360081E',
        rightCode: 'A2400',
        leftData: 30,
        rightData: 4,
      },
    ],
    [],
  )

  const handleUpdateLeftBoard = useCallback(() => {
    setRequests(leftBoardData)
  }, [leftBoardData])

  const handleUpdateRightBoard = useCallback(() => {
    setPicking(rightBoardData)
  }, [rightBoardData])

  useEffect(() => {
    const fetchDados = async () => {
      const actualDate = format(new Date(), 'HH:mm')

      setDate(actualDate)
      setRequests(leftBoardData)
      setPicking(rightBoardData)

      fetch('http://b8950b0f23c4.sn.mynetname.net:8085/rest/Painel', {
        headers: {
          'X-Token': '7adcdcec-a653-11ed-afa1-0242ac120002',
        },
      })
        .then(() => {
          setDate(actualDate)
          handleUpdateLeftBoard()
          handleUpdateRightBoard()
          setError(false)
        })
        .catch((error) => {
          console.log(error)
          setError(true)
        })
    }

    fetchDados()

    const intervalId = setInterval(fetchDados, 15000)

    return () => clearInterval(intervalId)
  }, [
    handleUpdateLeftBoard,
    handleUpdateRightBoard,
    leftBoardData,
    rightBoardData,
  ])

  return (
    <div className="container">
      <main className="content">
        <section className="board">
          <header className="header">
            <ListChecks size={30} />
            <span className="title">SEPARAÇÃO DE PEDIDOS</span>
          </header>

          <main className="board-content">
            {requests &&
              requests.map((request, index) => {
                if (index <= cardsQuantity) {
                  return (
                    <div className="board-row" key={request.code}>
                      <section
                        id="board-card"
                        className={
                          request.status === 'Iniciado'
                            ? 'in-progress'
                            : 'to-do'
                        }
                      >
                        <span className="card-title">{request.code}</span>
                        <div className="card-content">
                          <span className="card-info-title">
                            {request.name}
                          </span>
                          <div className="card-info">
                            <span>
                              {format(request.date, 'dd/MM/yyyy - HH:mm')}
                            </span>
                          </div>
                        </div>
                        <span className="card-quantity">
                          {request.quantity} CX.
                        </span>
                      </section>

                      <span
                        id="badge"
                        className={
                          request.status === 'Iniciado'
                            ? 'in-progress'
                            : 'to-do'
                        }
                      >
                        {request.status === 'Iniciado'
                          ? request.responsible
                          : 'Não iniciado'}
                      </span>

                      <span className="data">
                        {request.pct ? request.pct + '%' : ''}
                      </span>
                    </div>
                  )
                } else {
                  return null
                }
              })}
          </main>

          {requests.length > cardsQuantity && (
            <div className="board-footer">
              <section className="quantity-badge">
                <span>+{requests.length - cardsQuantity}</span>
              </section>
            </div>
          )}
        </section>

        <section className="board">
          <header className="header">
            <LayoutTemplate size={30} />
            <span className="title">REABASTECIMENTO PICKING</span>
          </header>

          <main className="board-content">
            {picking &&
              picking.map((pc) => (
                <section className="picking-card" key={pc.mainCode}>
                  <header>
                    <div className="picking-card-info">
                      <span>{pc.leftCode}</span>
                    </div>
                    <div className="picking-card-info">
                      <span className="picking-code">{pc.mainCode}</span>
                    </div>
                    <div className="picking-card-info">
                      <span>{pc.rightCode}</span>
                    </div>
                  </header>

                  <main>
                    <div className="picking-card-info">
                      <span>{pc.leftData}</span>
                    </div>

                    <div className="picking-card-info">
                      <MoveRight size={28} />
                    </div>

                    <div className="picking-card-info">
                      <span>{pc.rightData}</span>
                    </div>
                  </main>
                </section>
              ))}
          </main>
        </section>
      </main>

      <footer className="footer">
        <div className="error-box">
          <section className="time">
            <Clock />
            <span className="time-info">{date}</span>
          </section>
          {error && (
            <section className="error-div">
              <AlertTriangle size={16} />
              <span>Não sincronizado</span>
            </section>
          )}
        </div>
        <img src={logo} alt="logo" className="logo" />
      </footer>
    </div>
  )
}
