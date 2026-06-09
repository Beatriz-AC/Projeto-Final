function Card({ foto, nome }) {
  return (
    <article className="person-card">
      <div className="person-photo">
        <img src={foto} alt={nome} />
      </div>
      <h3>{nome}</h3>
    </article>
  )
}

export default Card
