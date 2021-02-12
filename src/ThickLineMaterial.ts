/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Color, MaterialParameters, ShaderMaterial, UniformsLib, UniformsUtils, Vector2 } from 'three'
import vertexShader from './glsl/thickLine.vert'
import fragmentShader from './glsl/thickLine.frag'

const DEFAULT_UNIFORMS = UniformsUtils.merge([
  UniformsLib.common,
  UniformsLib.fog,
  {
    uLinewidth: { value: 1 },
    uResolution: { value: new Vector2(1, 1) },
    uDashScale: { value: 1 },
    uDashSize: { value: 1 },
    uDashOffset: { value: 0 },
    uGapSize: { value: 1 },
  },
])

interface IParameters extends MaterialParameters {
  color?: string | number | Color
  resolution?: Vector2
  linewidth?: number
  dashed?: boolean
}

export class ThickLineMaterial extends ShaderMaterial {
  type = 'ThickLineMaterial'
  public dashed = false

  constructor(parameters: IParameters) {
    super({
      vertexShader,
      fragmentShader,
      uniforms: UniformsUtils.clone(DEFAULT_UNIFORMS),
      clipping: true,
    })
    this.setValues(parameters)
  }
  get resolution(): Vector2 {
    return this.uniforms.uResolution.value
  }
  set resolution(value: Vector2) {
    this.uniforms.uResolution.value = value
  }
  //@ts-ignore
  get opacity(): number {
    return this.uniforms.opacity.value
  }
  set opacity(value: number) {
    if (this.uniforms) this.uniforms.opacity.value = value
  }
  get gapSize(): number {
    return this.uniforms.uGapSize.value
  }
  set gapSize(value: number) {
    this.uniforms.uGapSize.value = value
  }
  get dashOffset(): number {
    return this.uniforms.uDashOffset.value
  }
  set dashOffset(value: number) {
    this.uniforms.uDashOffset.value = value
  }
  get dashSize(): number {
    return this.uniforms.uDashSize.value
  }
  set dashSize(value: number) {
    this.uniforms.uDashSize.value = value
  }
  get dashScale(): number {
    return this.uniforms.uDashScale.value
  }
  set dashScale(value: number) {
    this.uniforms.uDashScale.value = value
  }
  //@ts-ignore
  get linewidth(): number {
    return this.uniforms.uLinewidth.value
  }
  set linewidth(value: number) {
    if (this.uniforms && this.uniforms.uLinewidth) this.uniforms.uLinewidth.value = value
  }
  get color(): number {
    return this.uniforms.diffuse.value
  }
  set color(value: number) {
    this.uniforms.diffuse.value = value
  }
}
