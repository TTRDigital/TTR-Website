"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type HeroSignals = {
  /** 0 at rest, 1 when the hero has scrolled out */
  scroll: number;
  /** pointer position, -1..1 */
  px: number;
  py: number;
};

/* Ashima 3D simplex noise (MIT) */
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uSize;
uniform float uPixelRatio;
attribute vec3 aDir;
attribute float aShell;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
${noise}
void main(){
  float t = uTime;
  float n = snoise(aDir * 1.15 + vec3(0.0, t * 0.05, t * 0.03));
  float n2 = snoise(aDir * 3.4 - vec3(t * 0.035));
  float r = aShell * (1.0 + n * 0.11 + n2 * 0.035);
  vec3 sphere = aDir * r;

  // On scroll, the core unfolds into a rippling signal disc.
  float theta = atan(aDir.z, aDir.x);
  float rr = 0.25 + acos(clamp(aDir.y, -1.0, 1.0)) / 3.14159 * 1.55 * aShell;
  vec3 disc = vec3(cos(theta) * rr, sin(rr * 4.0 - t * 0.9) * 0.1 + n * 0.08, sin(theta) * rr);
  float m = smoothstep(0.0, 1.0, uScroll);
  vec3 pos = mix(sphere, disc, m);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float h = clamp(n * 0.5 + 0.5, 0.0, 1.0);
  gl_PointSize = uSize * (0.5 + aSeed) * (0.85 + h * 0.5) * uPixelRatio * (4.0 / -mv.z);

  vec3 deep = vec3(0.40, 0.11, 0.64);
  vec3 violet = vec3(0.62, 0.40, 1.0);
  vec3 lav = vec3(0.95, 0.91, 1.0);
  vColor = mix(mix(deep, violet, smoothstep(0.15, 0.75, h)), lav, pow(h, 5.0));
  float ndv = dot(normalize(pos), normalize(-mv.xyz));
  float facing = smoothstep(-0.6, 0.6, ndv);
  float rim = pow(1.0 - abs(ndv), 3.0) * (1.0 - m);
  vColor = mix(vColor, lav, rim * 0.55);
  vAlpha = (0.3 + 0.7 * h) * mix(0.5, 1.0, facing) * (aShell < 0.95 ? 0.55 : 1.0) * (1.15 + rim * 0.9);
}`;

const ringVertex = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uSize;
uniform float uPixelRatio;
uniform float uSpeed;
attribute float aAngle;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float a = aAngle;
  float radius = 1.42 + aSeed * 0.05 + uScroll * 0.5;
  vec3 pos = vec3(cos(a) * radius, (aSeed - 0.5) * 0.03, sin(a) * radius);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float head = fract(a / 6.28318 - uTime * uSpeed);
  float trail = pow(head, 10.0);
  gl_PointSize = uSize * (0.7 + trail * 0.9) * uPixelRatio * (4.0 / -mv.z);
  vColor = mix(vec3(0.55, 0.35, 0.95), vec3(0.96, 0.93, 1.0), trail);
  vAlpha = (0.1 + trail * 0.75) * (1.0 - uScroll * 0.6);
}`;

const pointFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 1.7);
  gl_FragColor = vec4(vColor * a * vAlpha, a * vAlpha);
}`;

const glowVertex = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const glowFragment = /* glsl */ `
uniform float uScroll;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  float d = clamp(length(vUv - 0.5) * 2.0, 0.0, 1.0);
  float core = 1.0 - d;
  float g = core * core * core * (1.0 - uScroll * 0.7);
  vec3 c = mix(vec3(0.30, 0.08, 0.50), vec3(0.58, 0.36, 0.98), core * core);
  // dither to avoid 8-bit banding in the soft gradient
  float n = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  float a = g * 0.42 + n;
  gl_FragColor = vec4(c * a, max(a, 0.0));
}`;

function fibonacciSphere(count: number) {
  const dirs = new Float32Array(count * 3);
  const shells = new Float32Array(count);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  let s = 1337;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i + rand() * 0.02;
    // slight jitter so it reads as a cloud, not a lattice
    const jx = (rand() - 0.5) * 0.04;
    const jz = (rand() - 0.5) * 0.04;
    const v = new THREE.Vector3(Math.cos(th) * r + jx, y, Math.sin(th) * r + jz).normalize();
    dirs.set([v.x, v.y, v.z], i * 3);
    const roll = rand();
    shells[i] = roll < 0.82 ? 1 : roll < 0.95 ? 0.55 + rand() * 0.35 : 1.15 + rand() * 0.4;
    seeds[i] = Math.pow(rand(), 2.2);
  }
  return { dirs, shells, seeds };
}

export function GrowthCore({
  count,
  signals,
  frozenTime,
  pixelRatio,
  sizeBoost = 1,
}: {
  count: number;
  signals: React.RefObject<HeroSignals>;
  frozenTime?: number;
  pixelRatio: number;
  /** Lite scenes have fewer, slightly larger points */
  sizeBoost?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0, scroll: 0, time: frozenTime ?? 0 });
  const coreMat = useRef<THREE.ShaderMaterial>(null);
  const ringAMat = useRef<THREE.ShaderMaterial>(null);
  const ringBMat = useRef<THREE.ShaderMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);

  const core = useMemo(() => {
    const { dirs, shells, seeds } = fibonacciSphere(count);
    const geo = new THREE.BufferGeometry();
    // position is required by three for bounds; the shader uses aDir
    geo.setAttribute("position", new THREE.BufferAttribute(dirs, 3));
    geo.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
    geo.setAttribute("aShell", new THREE.BufferAttribute(shells, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
    return geo;
  }, [count]);

  const ring = useMemo(() => {
    const n = Math.round(count / 14);
    const angles = new Float32Array(n);
    const seeds = new Float32Array(n);
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      angles[i] = (i / n) * Math.PI * 2;
      seeds[i] = (Math.sin(i * 91.7) * 0.5 + 0.5) % 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
    return geo;
  }, [count]);

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: frozenTime ?? 0 },
      uScroll: { value: 0 },
      uSize: { value: 5.2 },
      uPixelRatio: { value: pixelRatio },
    }),
    [frozenTime, pixelRatio],
  );
  const ringA = useMemo(
    () => ({
      uTime: { value: frozenTime ?? 0 },
      uScroll: { value: 0 },
      uSize: { value: 4.2 },
      uPixelRatio: { value: pixelRatio },
      uSpeed: { value: 0.045 },
    }),
    [frozenTime, pixelRatio],
  );
  const ringB = useMemo(
    () => ({
      uTime: { value: (frozenTime ?? 0) + 7 },
      uScroll: { value: 0 },
      uSize: { value: 3.6 },
      uPixelRatio: { value: pixelRatio },
      uSpeed: { value: -0.03 },
    }),
    [frozenTime, pixelRatio],
  );
  const glowUniforms = useMemo(() => ({ uScroll: { value: 0 } }), []);

  useFrame((state, delta) => {
    // Size points relative to the drawing buffer so the look is the same
    // at any canvas size or pixel ratio (and matches the static poster).
    const scale = (state.size.height * state.viewport.dpr) / 900;
    const dt = Math.min(delta, 0.05);
    const sig = signals.current;
    const k = 1 - Math.pow(0.04, dt);
    tilt.current.x += ((sig?.py ?? 0) * 0.22 - tilt.current.x) * k;
    tilt.current.y += ((sig?.px ?? 0) * 0.32 - tilt.current.y) * k;
    tilt.current.scroll += ((sig?.scroll ?? 0) - tilt.current.scroll) * (1 - Math.pow(0.002, dt));
    const sc = tilt.current.scroll;

    if (frozenTime === undefined) tilt.current.time += dt;
    const time = tilt.current.time;

    // Uniforms are mutated through material refs, the idiomatic R3F way.
    const mats = [coreMat.current, ringAMat.current, ringBMat.current];
    mats.forEach((m, i) => {
      if (!m) return;
      m.uniforms.uTime.value = time + (i === 2 ? 7 : 0);
      m.uniforms.uScroll.value = sc;
      m.uniforms.uPixelRatio.value = scale * sizeBoost;
    });
    if (glowMat.current) glowMat.current.uniforms.uScroll.value = sc;

    const g = group.current;
    if (g) {
      g.rotation.x = 0.18 + tilt.current.x + sc * 0.55;
      g.rotation.y = time * 0.035 + tilt.current.y;
    }
  });

  return (
    <>
      <mesh position={[0, 0, -1.2]} renderOrder={0}>
        <planeGeometry args={[4.6, 4.6]} />
        <shaderMaterial
          ref={glowMat}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={glowUniforms}
          transparent
          premultipliedAlpha
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <group ref={group}>
        <points geometry={core} renderOrder={1}>
          <shaderMaterial
            ref={coreMat}
            vertexShader={coreVertex}
            fragmentShader={pointFragment}
            uniforms={coreUniforms}
            transparent
            premultipliedAlpha
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <points geometry={ring} rotation={[0.42, 0, 0.18]} renderOrder={2}>
          <shaderMaterial
            vertexShader={ringVertex}
            fragmentShader={pointFragment}
            ref={ringAMat}
            uniforms={ringA}
            transparent
            premultipliedAlpha
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <points geometry={ring} rotation={[-0.9, 0.4, -0.5]} scale={1.12} renderOrder={2}>
          <shaderMaterial
            vertexShader={ringVertex}
            fragmentShader={pointFragment}
            ref={ringBMat}
            uniforms={ringB}
            transparent
            premultipliedAlpha
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
}
