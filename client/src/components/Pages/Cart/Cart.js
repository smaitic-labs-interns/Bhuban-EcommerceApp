import React from 'react'

export default function Cart() {
  return (
    <>
     <table border={1}>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Product Name</th>
          <th>Price(per Item)</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1adnwjndwad</td>
          <td>100</td>
          <td>10</td>
          <td>1000</td>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Shipping Charge</th>
          <th>--</th>
          <th>100</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>VAT (13%)</th>
          <th>--</th>
          <th>1300</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Total</th>
          <th>100</th>
          <th>100000</th>
        </tr>
      </tbody>
     </table>
    </>
  )
}
