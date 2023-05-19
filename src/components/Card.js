const Card = ( {src} ) => {
    return(
        <div className="col mb-5">
            <div class="card" style={{width: "18rem"}}>
                <img src={src} class="card-img-top" alt={src} />
            </div>
        </div>
    )
}

export default Card;