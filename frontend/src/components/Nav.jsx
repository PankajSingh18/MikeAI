import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

function Nav() {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)
    return (
        <>
            {selectedConversation && (
                <div className='h-[52px] flex items-center gap-2.5 px-5 border-b border-white/[0.08] bg-[#1c1c1e]'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.08]'>
                        <MessageSquare size={11} className="text-white/50" />
                    </div>
                    <div className='text-[13.5px] font-semibold text-white/90 tracking-tight'>
                        {selectedConversation?.title || "New Chat"}
                    </div>
                    <div className='text-[10px] font-medium text-white/25 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full'>
                        {messages?.length} messages
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav
