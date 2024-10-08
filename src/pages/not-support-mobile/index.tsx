import { useEffect } from 'react'
import { useRouter } from 'next/router'
import library from '~/utils/Library'
export default function NotSupportMobile() {
    const router = useRouter()

    useEffect(() => {
        if (!library().isMobile()) {
            router.push('admin')
        }
    }, [])
    return <>
        <div style={{
            background: '#022533',
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            gap: 10,
            userSelect: 'none',
            color: 'yellow',
        }}>
            <img
                style={{
                    width: 150,
                    borderRadius: 30,
                }}
                src='/not-sp-mobile.png' alt={'Accept Permission'}/>
            <label style={{
                maxWidth: '80%',
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>Trang hiện tại không hỗ trợ phiên bản Điện thoại</label>
        </div>
    </>
}
NotSupportMobile.layout = 'client'
