import React from 'react'
import styled from 'styled-components'
import { gray2, gray3 } from '../../../assets/styles/palettes'

interface ReviewTableProps{
    reviews : review[]
}

interface review{
    reviewId : number
    fishId : number
    fishName : string
    weight : number
    pricePerKg : number
    totalPrice : number
}

const Table = styled.table`
    margin : 3% 0 3% 0;
    width : 100%;
    text-align: center;
    border-top : 1px solid ${gray3};
    border-bottom : 1px solid ${gray3};
`

const Thead = styled.thead`
    height : 40px;
`

const Td = styled.td`
    height : 40px;
    text-align: center;

    & > span{
        color : ${gray3}
    }
`

const Th = styled.th`
    border-bottom : 1px solid ${gray2};
`


export default function ReviewTable({reviews} : ReviewTableProps) {
    return (
        <Table>
            <Thead>
                <Th>품종</Th>
                <Th>무게</Th>
                <Th>구매가격</Th>
            </Thead>
            <tbody>
                {reviews && reviews.map(((review, index) => (
                <tr key = {index}>
                    <Td>{review.fishName}</Td>
                    <Td>{review.weight}<span>kg</span></Td>
                    <Td>{review.totalPrice}<span>원</span></Td>
                </tr>
                )))}
            </tbody>
        </Table>
    )
}
