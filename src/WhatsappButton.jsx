import React from 'react'

const WhatsAppButton = ({ phone }) => {

    const formatNumber = (phone) => {
        if (!phone) return ''

        let clean = phone.toString().replace(/\s+/g, '')

        if (clean.startsWith('+34')) return clean
        if (clean.startsWith('34')) return `+${clean}`

        return `+34${clean}`
    }

    const handleClick = () => {
        const number = formatNumber(phone)
        const url = `https://wa.me/${number.replace('+', '')}`
        window.open(url, '_blank')
    }

    return (
        <button className='whats-button'
            onClick={handleClick}
            title="WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="20"
                height="20"
                fill="#25D366"
            >
                <path d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.12 2.82.14.18 1.93 2.96 4.68 4.15.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/>
                <path d="M16 3C9.37 3 4 8.37 4 15c0 2.1.55 4.07 1.52 5.78L4 29l8.4-1.47C14.07 28.46 15.01 28.6 16 28.6c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 22.6c-.85 0-1.69-.13-2.5-.39l-.18-.06-4.99.87.9-4.87-.12-.19A9.57 9.57 0 0 1 6.4 15c0-5.3 4.3-9.6 9.6-9.6s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z"/>
            </svg>
        </button>
    )
}

export default WhatsAppButton