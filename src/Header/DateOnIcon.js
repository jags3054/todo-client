import React from 'react'

export default function DateOnIcon() {
    const today = new Date().getDate();

    const appendLeadingZeroes = (today) => {
        if (today <= 9) {
            return "0" + today;
        }
        return today;
    }
    return (
        <>
            <span>{appendLeadingZeroes(today)}</span>
        </>
    )
}
