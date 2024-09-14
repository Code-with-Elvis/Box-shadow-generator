import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { setSettings } from '../Features/Inputs/inputSlice'

const Inputs = () => {
  const dispatch = useAppDispatch()
  const [shadow, setShadow] = useState({
    hLength: 0,
    vLength: 0,
    blurRadius: 0,
    sRadius: 0,
    opacity: 1,
    boxRadius: 0,
    shadowColor: '#ffffff',
    boxColor: '#2563eb',
    inset: false,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof typeof shadow
  ) {
    let value
    if (property === 'inset') {
      value = e.target.checked
    } else {
      value = e.target.value
      if (property === 'opacity') {
        value = value.toString().slice(0, 3)
      } else if (property === 'shadowColor' || property === 'boxColor') {
        value = value.toString().slice(0, 7)
      } else {
        value = value.toString().slice(0, 3)
      }
    }

    // Update the local shadow state
    setShadow((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  // Effect to dispatch the updated shadow state after user input
  useEffect(() => {
    const newShadow = {
      hLength: Number(shadow.hLength) || 0,
      vLength: Number(shadow.vLength) || 0,
      blurRadius: Number(shadow.blurRadius) || 0,
      sRadius: Number(shadow.sRadius) || 0,
      opacity: !isNaN(Number(shadow.opacity)) ? Number(shadow.opacity) : 1,
      boxRadius: Number(shadow.boxRadius) || 0,
      shadowColor: shadow.shadowColor,
      boxColor: shadow.boxColor,
      inset: shadow.inset,
    }

    dispatch(setSettings(newShadow))
  }, [shadow, dispatch]) // Runs the effect every time the shadow state changes
  return (
    <section className="inputs">
      <article className="input-field">
        <label htmlFor="h-length">Horizontal Length</label>
        <div>
          <input
            type="text"
            value={shadow.hLength}
            id="h-length"
            onChange={(e) => handleChange(e, 'hLength')}
          />
          <span>px</span>
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="v-length">Vertical Length</label>
        <div>
          <input
            type="text"
            value={shadow.vLength}
            id="v-length"
            onChange={(e) => handleChange(e, 'vLength')}
          />
          <span>px</span>
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="b-radius">Blur Radius</label>
        <div>
          <input
            type="text"
            value={shadow.blurRadius}
            id="b-radius"
            onChange={(e) => handleChange(e, 'blurRadius')}
          />
          <span>px</span>
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="s-radius">Spread Radius</label>
        <div>
          <input
            type="text"
            value={shadow.sRadius}
            id="s-radius"
            onChange={(e) => handleChange(e, 'sRadius')}
          />
          <span>px</span>
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="opacity">Opacity</label>
        <div>
          <input
            type="text"
            value={shadow.opacity}
            id="opacity"
            onChange={(e) => handleChange(e, 'opacity')}
          />
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="s-color">Shadow Color</label>
        <div>
          <input
            type="color"
            value={shadow.shadowColor}
            onChange={(e) => handleChange(e, 'shadowColor')}
          />
          <input
            type="text"
            className="input-lg"
            value={shadow.shadowColor}
            id="s-color"
            readOnly
            onChange={(e) => handleChange(e, 'shadowColor')}
          />
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="b-color">Box Color</label>
        <div>
          <input
            type="color"
            value={shadow.boxColor}
            onChange={(e) => handleChange(e, 'boxColor')}
          />
          <input
            type="text"
            className="input-lg"
            value={shadow.boxColor}
            id="b-color"
            readOnly
            onChange={(e) => handleChange(e, 'boxColor')}
          />
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="box-radius">Box Radius</label>
        <div>
          <input
            type="text"
            value={shadow.boxRadius}
            id="box-radius"
            onChange={(e) => handleChange(e, 'boxRadius')}
          />
          <span>px</span>
        </div>
      </article>
      <article className="input-field">
        <label htmlFor="inset">Inset</label>
        <div>
          <input
            type="checkbox"
            checked={shadow.inset}
            id="inset"
            onChange={(e) => handleChange(e, 'inset')}
          />
        </div>
      </article>
    </section>
  )
}
export default Inputs
