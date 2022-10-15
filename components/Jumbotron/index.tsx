interface IJumbotronProps {
    children: React.ReactNode
}

export const Jumbotron = ({ children }: IJumbotronProps) => {
    return (
        <div className="max-w-screen-lg bg-slate-300 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4">
            {children}
            {/* <h2 className="text-3xl leading-9 font-bold tracking-tight text-white sm:text-4xl sm:leading-10">
                Start studying with us
            </h2>
            <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md bg-white shadow">
                    <a href="#" className="text-gray-700 font-bold py-2 px-6">
                        Start
                    </a>
                </div>
            </div> */}
        </div>

    )
}

export default Jumbotron