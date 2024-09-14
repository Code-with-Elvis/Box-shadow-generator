import { RxCopy } from 'react-icons/rx'
import { useAppSelector } from '../hooks'
import { hexToRgba } from '../Tools'
import { useState } from 'react'

const Result = () => {
  const [copySuccess, setCopySuccess] = useState('')
  const { setting } = useAppSelector((state) => state.inputs)
  const {
    hLength,
    vLength,
    blurRadius,
    sRadius,
    opacity,
    boxRadius,
    shadowColor,
    boxColor,
    inset,
  } = setting

  const generateCssCode = () => {
    const shadowValue = `${
      inset ? 'inset ' : ''
    }${hLength}px ${vLength}px ${blurRadius}px ${sRadius}px ${hexToRgba(
      shadowColor,
      opacity
    )}`

    return `
-webkit-box-shadow: ${shadowValue};
-moz-box-shadow: ${shadowValue};
box-shadow: ${shadowValue};
background-color: ${boxColor};
border-radius: ${boxRadius}px;
    `
  }

  const copyToClipboard = () => {
    const cssCode = generateCssCode()

    navigator.clipboard.writeText(cssCode).then(
      () => {
        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(''), 1500) // Reset after 2 seconds
      },
      (err) => {
        console.error('Failed to copy code: ', err)
        alert('Failed to copy code. Try again')
      }
    )
  }
  return (
    <section className="results">
      <article className="box-elem">
        <button
          style={{
            boxShadow: `${
              inset ? 'inset' : ''
            } ${hLength}px ${vLength}px ${blurRadius}px ${sRadius}px ${hexToRgba(
              shadowColor,
              opacity
            )}`,
            backgroundColor: boxColor,
            borderRadius: `${boxRadius}px`,
          }}
        >
          Elem
        </button>
      </article>
      <article className="code-box">
        <div title="copy code" className="copy-btn" onClick={copyToClipboard}>
          <RxCopy size={18} />
          {copySuccess && <span className="copy-success">{copySuccess}</span>}
        </div>
        <code>
          <p>
            -webkit-box-shadow: {inset ? 'inset' : ''} {hLength}px {vLength}px{' '}
            {blurRadius}px {sRadius}px {hexToRgba(shadowColor, opacity)};
          </p>
          <p>
            -moz-box-shadow: {inset ? 'inset' : ''} {hLength}px {vLength}px{' '}
            {blurRadius}px {sRadius}px {hexToRgba(shadowColor, opacity)};
          </p>
          <p>
            box-shadow: {inset ? 'inset' : ''} {hLength}px {vLength}px{' '}
            {blurRadius}px {sRadius}px {hexToRgba(shadowColor, opacity)};
          </p>
        </code>
      </article>
    </section>
  )
}
export default Result
