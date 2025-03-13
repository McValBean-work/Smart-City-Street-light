import './main.css'

function Main({children , mainClass}) {
    return(
        <>
        <main className={mainClass}>
            {children}
        </main>
        </>
    )
}

export default Main;