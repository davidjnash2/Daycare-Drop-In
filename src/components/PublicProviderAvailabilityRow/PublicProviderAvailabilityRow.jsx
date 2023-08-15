import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

function PublicProviderAvailabilityRow({ entryRow }) {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const providerId = useParams();

    console.log('in PublicProviderAvailabilityRow and providerId is:', providerId.id);
    // console.log('in PublicProviderAvailabilityRow and entryRow is:', entryRow);
    // console.log('in PublicProviderAvailabilityRow and entryRow.infant is:', entryRow.infant);
    console.log('in PublicProviderAvailabilityRow and user is:', user);



    // formats dates for table appearance
    const formattedDate = (availableDate) => {
        return new Date(availableDate).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const startBooking = () => {
        console.log('in startBooking function in ProviderAvailabilityTable, and providerId.id and user.family_id are:', providerId.id, user.family_id);
        history.push(`/booking/${providerId.id}/${entryRow.id}/${user.family_id}`);
    }

    return (
        <>
            {entryRow && (entryRow.infant > 0 || entryRow.toddler > 0 || entryRow.pre_k > 0 || entryRow.schoolage > 0) && (
                < tr
                id={entryRow.id}
            onClick={() => startBooking(entryRow.id)}
            >
            <td>{formattedDate(entryRow.date)}</td>
            <td>{entryRow.infant}</td>
            <td>{entryRow.toddler}</td>
            <td>{entryRow.pre_k}</td>
            <td>{entryRow.schoolage}</td>
        </tr >
            )}
        </>
    )
}

export default PublicProviderAvailabilityRow;