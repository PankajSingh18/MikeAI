import React, { useState, useEffect } from 'react'
import { Coins, LogOut, Menu, MessageSquare, PanelLeftIcon, PanelRight, PenSquare, Plus, User, X } from "lucide-react"
import { getConversations } from '../features/getConversations'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, setConversations, setSelectedConversation } from '../redux/conversationSlice'
import { createConversation } from '../features/createConversation'
import logOut from '../features/logOut'
import { setUserdata } from '../redux/userSlice'
import BillingDrawer from './BillingDrawer'

function SideBar() {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const [imageError, setImageError] = useState(false)
    const { conversations, selectedConversation } = useSelector(state => state.conversation)
    const { userData } = useSelector(state => state.user)
    const [showBilling, setShowBilling] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const getConv = async () => {
            const data = await getConversations()
            dispatch(setConversations(data))
        }
        getConv()
    }, [userData?._id])

    if (collapsed) {
        return (
            <div className='hidden lg:flex flex-col items-center w-[54px] h-screen bg-[#1c1c1e] border-r border-white/[0.08] py-4 gap-1 shrink-0'>
                <button className='flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-2'
                    onClick={() => setCollapsed(false)}>
                    <PanelRight size={15} />
                </button>
                <button className='flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                    onClick={() => dispatch(setSelectedConversation(null))}>
                    <Plus size={15} />
                </button>
                <div className='flex-1 overflow-y-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-4 w-full'>
                    {conversations.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id
                        return (
                            <div key={conv?._id || i}
                                onClick={() => dispatch(setSelectedConversation(conv))}
                                className={`flex items-center justify-center mb-0.5 w-full p-2 rounded-[8px] cursor-pointer transition-colors duration-150
                                ${isActive ? "bg-white/10" : "hover:bg-white/[0.05]"}`}>
                                <MessageSquare size={12} className={isActive ? "text-white" : "text-white/30"} />
                            </div>
                        )
                    })}
                </div>
                <div className='shrink-0 px-2'>
                    {(userData?.avatar && !imageError)
                        ? <img className='w-8 h-8 rounded-[8px] object-cover border border-white/10' src={userData?.avatar} alt="avatar" onError={() => setImageError(true)} />
                        : <div className='w-8 h-8 rounded-[8px] bg-white/[0.06] flex items-center justify-center'><User size={13} className="text-white/30" /></div>
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <button className='lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#1c1c1e] border border-white/[0.10] text-white/40 hover:text-white transition-colors duration-150 cursor-pointer'
                onClick={() => setMobileOpen(true)}>
                <Menu size={14} />
            </button>

            {mobileOpen && <div onClick={() => setMobileOpen(false)} className='lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm' />}

            <div className={`fixed lg:static inset-y-0 left-0 z-50
                w-[256px] h-screen shrink-0
                bg-[#1c1c1e] border-r border-white/[0.08]
                transition-transform duration-200
                ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                <div className='flex flex-col h-full'>

                    {/* Header */}
                    <div className='flex items-center gap-2 px-4 py-[15px] border-b border-white/[0.08]'>
                        <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer'
                            onClick={() => setCollapsed(true)}>
                            <PanelLeftIcon size={14} />
                        </div>
                        <button onClick={() => setMobileOpen(false)}
                            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 bg-transparent border-none cursor-pointer">
                            <X size={14} />
                        </button>
                        <span className='text-[14px] font-semibold text-white tracking-tight flex-1'>MikeAI</span>
                        <span className='text-[9px] font-medium text-white/40 bg-white/[0.06] border border-white/[0.10] px-2 py-0.5 rounded-full tracking-wider uppercase'>{userData?.plan || "free"}</span>
                        <button className='flex items-center justify-center w-6 h-6 rounded-md text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                            onClick={() => dispatch(setSelectedConversation(null))}>
                            <PenSquare size={13} />
                        </button>
                    </div>

                    {/* New Chat */}
                    <div className='px-3.5 pt-3.5 pb-1'>
                        <button className='w-full flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-white bg-[#3a3a3c] rounded-[10px] py-[9px] border border-white/[0.08] cursor-pointer hover:bg-[#444446] transition-all duration-150'
                            onClick={() => dispatch(setSelectedConversation(null))}>
                            <Plus size={13} />
                            New Chat
                        </button>
                    </div>

                    {/* Label */}
                    <div className='px-4 pt-3.5 pb-1 text-[9.5px] font-semibold uppercase tracking-widest text-white/25'>
                        {conversations.length === 0 ? "No conversations" : "Recent"}
                    </div>

                    {/* Conversation List */}
                    <div className='flex-1 overflow-y-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                        {conversations?.map((conv, i) => {
                            const isActive = selectedConversation?._id == conv?._id
                            return (
                                <div key={conv?._id || i}
                                    onClick={() => dispatch(setSelectedConversation(conv))}
                                    className={`flex items-center gap-2 cursor-pointer mb-px px-2.5 py-2 rounded-[9px] transition-colors duration-150
                                    ${isActive ? "bg-white/[0.08] border border-white/[0.10]" : "border border-transparent hover:bg-white/[0.04]"}`}>
                                    <div className={`flex items-center justify-center shrink-0 w-[22px] h-[22px] rounded-md transition-colors duration-150
                                    ${isActive ? "bg-white/10 text-white" : "text-white/25"}`}>
                                        <MessageSquare size={11} />
                                    </div>
                                    <span className={`text-[12.5px] font-medium truncate ${isActive ? "text-white" : "text-white/50"}`}>
                                        {conv?.title || "New Chat"}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer */}
                    <div className='mx-3 h-px bg-white/[0.08]' />
                    <div className='px-3 py-3'>
                        {userData ? (
                            <div className='flex items-center gap-2.5 cursor-pointer rounded-[10px] px-2.5 py-2 hover:bg-white/[0.05] transition-colors duration-150'>
                                <div className='shrink-0'>
                                    {(userData?.avatar && !imageError)
                                        ? <img className='w-8 h-8 rounded-[9px] object-cover border border-white/10' src={userData?.avatar} alt="avatar" onError={() => setImageError(true)} />
                                        : <div className='w-8 h-8 rounded-[9px] bg-white/[0.06] flex items-center justify-center'><User size={13} className="text-white/30" /></div>
                                    }
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-[12.5px] font-semibold text-white truncate'>{userData?.name || "User"}</p>
                                    <p className='text-[10.5px] text-white/30 mt-px capitalize'>{userData?.plan || "free"} plan</p>
                                </div>
                                <div className='flex gap-0.5'>
                                    <button onClick={() => setShowBilling(true)}
                                        className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-white/30 cursor-pointer hover:bg-white/[0.07] hover:text-white transition-all duration-150'>
                                        <Coins size={14} />
                                    </button>
                                    <button onClick={() => { logOut(); dispatch(setUserdata(null)) }}
                                        className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-white/30 cursor-pointer hover:bg-white/[0.07] hover:text-white transition-all duration-150'>
                                        <LogOut size={14} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className='w-full flex items-center justify-center gap-2 text-[12.5px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.08] rounded-[10px] py-[10px] cursor-pointer hover:bg-white/[0.06] transition-colors duration-150'>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <BillingDrawer open={showBilling} onClose={() => setShowBilling(false)} />
        </>
    )
}

export default SideBar
