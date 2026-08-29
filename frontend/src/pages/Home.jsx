import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../redux/userSlice';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';

function Home() {
    const {userData}=useSelector(state=>state.user)
    const dispatch=useDispatch()

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUserdata(data))
        } catch (error) {
            console.log(error)
        }
    }

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        await handleLogin(token)
    }

    return (
        <div className='h-screen flex bg-[#1c1c1e] text-white overflow-hidden'>

            <SideBar/>
            <ChatArea/>
            <Artifact/>

            {!userData && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                    <div className='w-[360px] bg-[#2c2c2e] border border-white/[0.12] rounded-2xl p-8 flex flex-col gap-6 shadow-2xl'>

                        {/* Logo / Brand */}
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex items-center gap-2 mb-1'>
                                <div className='w-7 h-7 rounded-lg bg-white flex items-center justify-center'>
                                    <span className='text-black text-xs font-black'>M</span>
                                </div>
                                <span className='text-[15px] font-bold text-white tracking-tight'>MikeAI</span>
                            </div>
                            <h2 className='text-[22px] font-semibold text-white tracking-tight leading-tight'>
                                Welcome back
                            </h2>
                            <p className='text-[13px] text-white/40 leading-relaxed'>
                                Sign in to continue your conversations
                            </p>
                        </div>

                        {/* Divider */}
                        <div className='h-px bg-white/[0.07]'/>

                        {/* Google Button */}
                        <button
                            className='w-full flex items-center justify-center gap-3 py-3 rounded-xl text-[13.5px] font-medium text-white bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 transition-all duration-150 cursor-pointer'
                            onClick={googleLogin}
                        >
                            <FcGoogle size={16} />
                            Continue with Google
                        </button>

                        <p className='text-[11px] text-white/20 text-center'>
                            By continuing, you agree to our Terms of Service
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home

