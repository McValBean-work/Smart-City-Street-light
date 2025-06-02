import './main.css'

function Main({className, children}) {
    return(
        <>
        <main className={className}>
            {children}
        </main>
        </>
    )
}

export default Main;