import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { HostelProvider } from '@context/HostelContext'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

import HomePage         from '@pages/HomePage'
import SearchPage       from '@pages/SearchPage'
import HostelDetailPage from '@pages/HostelDetailPage'
import LoginPage        from '@pages/LoginPage'
import RegisterPage     from '@pages/RegisterPage'
import DashboardPage    from '@pages/DashboardPage'
import BookingPage      from '@pages/BookingPage'
import WishlistPage     from '@pages/WishlistPage'
import ListHostelPage   from '@pages/ListHostelPage'
import NotFoundPage     from '@pages/NotFoundPage'

import './App.css'

export default function App(): React.ReactElement {
  return (
    //<BrowserRouter>
      <AuthProvider>  
        <HostelProvider>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/search"        element={<SearchPage />} />
              <Route path="/hostel/:id"    element={<HostelDetailPage />} />
              <Route path="/login"         element={<LoginPage />} />
              <Route path="/register"      element={<RegisterPage />} />
              <Route path="/dashboard"     element={<DashboardPage />} />
              <Route path="/book/:id"      element={<BookingPage />} />
              <Route path="/wishlist"      element={<WishlistPage />} />
              <Route path="/list-hostel"   element={<ListHostelPage />} />
              <Route path="*"              element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </HostelProvider>
      </AuthProvider>
    //</BrowserRouter>
  )
}
