import '../styles/global.css'
import Link from 'next/link'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-pink-900 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NFT Marketplace</span>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-pink-900 dark:border-gray-700">
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/createitem" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sell Digital Asset</Link>
                            </li>
                            <li>
                                <Link href="/myassets" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Digital Assets</Link>
                            </li>
                            <li>
                                <Link href="/creatordashboard" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Creator Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Component {...pageProps} />
        </>
    )
}

export default MyApp