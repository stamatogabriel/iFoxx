import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function Teste() {
  const [ano, setAno] = useState('')
  const [result, setResult] = useState(0)

  useEffect(() => {
      function getPascoa(){
                
        const a = ano % 19
        const b = Math.floor(ano / 100)
        const c = ano % 100
        const d = Math.floor(b / 4)
        const e = b % 4
        const f = Math.floor((b + 8)/25)
        const g = Math.floor((b - f + 1)/3)
        const h =  (19 * a + b - d - g + 15) % 30
        const i = Math.floor(c/4)
        const k = c % 4
        const l = (32 + 2 * e + 2 * i - h - k) % 7
        const m = Math.floor((a + 11 * h + 22 * l) / 451)
        const mes = Math.floor((h + l - 7 * m + 114) / 31)
        const dia = 1 + (h + l - 7 * m + 114) % 31

        setResult(`A páscoa em ${ano} é dia ${dia} do mês ${mes}`)
      }

      getPascoa()
  }, [ano])

  
    return (
        <>
    <input onChange={e => setAno(e.target.value)}/>
    <h1> {result} </h1>
          </>
  );
}
