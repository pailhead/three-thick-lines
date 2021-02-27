uniform vec3 diffuse;
uniform float opacity;
#ifdef USE_DASH
  uniform float uDashSize;
  uniform float uDashOffset;
  uniform float uGapSize;
#endif
varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vUv;
varying float vInstanceSegmentIndex;

%- cFragmentGlobal -%

vec4 transformColor( inout vec4 color ){
  %- cColor -%
  return color;
}

void main() {

  %- cFragmentStart -%

  #include <clipping_planes_fragment>
  #ifdef USE_DASH
    if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps
    if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX
  #endif
  if ( abs( vUv.y ) > 1.0 ) {
    float a = vUv.x;
    float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
    float len2 = a * a + b * b;
    if ( len2 > 1.0 ) discard;
  }
  vec4 diffuseColor = vec4( diffuse, opacity );
  #include <logdepthbuf_fragment>
  #include <color_fragment>
  gl_FragColor = transformColor( diffuseColor );
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
 
  %- cFragmentEnd -%

}