//typings for @math.gl/core v3.4.1
declare module '@math.gl/core/dist/es5/lib/common' {
	type TypedArray =
	  | Int8Array
	  | Uint8Array
	  | Int16Array
	  | Uint16Array
	  | Int32Array
	  | Uint32Array
	  | Uint8ClampedArray
	  | Float32Array
	  | Float64Array;

	type NumberArray = TypedArray | number[];

	type ConfigurationOptions = {
	  EPSILON?: number;
	  debug?: boolean;
	  precision?: number;
	  printTypes?: boolean;
	  printDegrees?: boolean;
	  printRowMajor?: boolean;
	  _cartographicRadians?: boolean;
	};

	export const config: ConfigurationOptions;

	export function configure(options?: ConfigurationOptions): ConfigurationOptions;

	export function formatValue(value: number, options?: ConfigurationOptions): string;

	/**
	 * Check if value is an "array"
	 * Returns `true` if value is either an array or a typed array
	 *
	 * Note: returns `false` for `ArrayBuffer` and `DataView` instances
	 */
	export function isArray(value: any): boolean;

	export function clone(array: number[]): number[];
	export function clone(array: TypedArray): TypedArray;

	export function toRadians(degrees: number): number;
	export function toRadians(degrees: number[]): number[];
	export function toRadians(degrees: TypedArray): TypedArray;
	export function toDegrees(radians: number): number;
	export function toDegrees(radians: number[]): number[];
	export function toDegrees(radians: TypedArray): TypedArray;

	// GLSL math function equivalents: Work on both single values and vectors

	/* eslint-disable no-shadow */

	export function radians(degrees, result?);
	export function degrees(radians, result?);

	/** "GLSL equivalent" of `Math.sin` Works on single values and vectors */
	export function sin(radians: number): number;
	export function sin(radians: number[]): number[];
	// "GLSL equivalent" of Math. : Works on single values and vectors
	export function cos(radians);
	/** "GLSL equivalent" of `Math.tan`: Works on single values and vectors */
	export function tan(radians);

	/** "GLSL equivalent" of `Math.asin`: Works on single values and vectors */
	export function asin(radians);
	/** "GLSL equivalent" of `Math.acos`: Works on single values and vectors */
	export function acos(radians);
	/** "GLSL equivalent" of `Math.atan`: Works on single values and vectors */
	export function atan(radians);

	/** GLSL style value clamping: Works on single values and vectors */
	export function clamp(value, min, max);

	// Interpolate between two numbers or two arrays
	export function lerp(a, b, t: number);

	export function equals(a, b, epsilon?: number);

	export function exactEquals(a, b);

	export function withEpsilon(epsilon: number, func: any): any;

}
declare module '@math.gl/core/dist/es5/classes/base/math-array' {
	
	/** Base class for vectors and matrices */
	export default class MathArray<DerivedType> extends Array<number> {
	  // Defined by derived class
	  ELEMENTS: number;
	  RANK: number;

	  clone(): DerivedType;

	  // TODO - define more sophisticated object type per class?
	  from(array: readonly number[]): DerivedType;
	  from(object: object): DerivedType;

	  fromArray(array: readonly number[], offset?: number): DerivedType;
	  // todo
	  to(arrayOrObject): any;
	  toTarget(target): any;

	  toArray(array?: number[], offset?: number): number[];
	  toFloat32Array(): Float32Array;
	  toString(): string;
	  formatString(opts: object): string;
	  equals(array: readonly number[]): boolean;
	  exactEquals(array: readonly number[]): boolean;

	  // Modifiers

	  negate(): DerivedType;
	  lerp(a: readonly number[], b: readonly number[], t: number): DerivedType;

	  min(vector: readonly number[]): DerivedType;
	  max(vector: readonly number[]): DerivedType;

	  clamp(minVector: readonly number[], maxVector: readonly number[]): DerivedType;

	  add(...vectors): DerivedType;
	  subtract(...vectors): DerivedType;

	  scale(scale): DerivedType;

	  // three.js compatibility

	  sub(a): DerivedType;
	  setScalar(a): DerivedType;
	  addScalar(a): DerivedType;
	  subScalar(a): DerivedType;
	  multiplyScalar(scalar): DerivedType;
	  divideScalar(a): DerivedType;
	  clampScalar(min, max): DerivedType;
	  elements: number[];

	  // Cesium compatibility
	  multiplyByScalar(scalar): DerivedType;

	  // private
	  check(): DerivedType;
	}

}
declare module '@math.gl/core/dist/es5/classes/base/vector' {
	import MathArray from './math-array';

	/** Base class for vectors */
	export default class Vector<VectorType> extends MathArray<VectorType> {
	  // VIRTUAL METHODS
	  // copy(vector) {

	  // ACCESSORS

	  x: number;
	  y: number;

	  // NOTE: `length` is a reserved word for Arrays, so we can't use `v.length()`
	  len(): number;
	  magnitude(): number;
	  lengthSquared(): number;
	  magnitudeSquared(): number;

	  distance(mathArray): number;

	  distanceSquared(mathArray): number;

	  dot(mathArray): number;
	  // MODIFIERS

	  normalize(): VectorType;

	  multiply(...vectors): VectorType;

	  divide(...vectors): VectorType;

	  // THREE.js compatibility
	  lengthSq(): number;
	  distanceTo(vector: VectorType): number;
	  distanceToSquared(vector): number;

	  getComponent(i): number;
	  setComponent(i, value): number;

	  addVectors(a: VectorType, b: VectorType): VectorType;
	  subVectors(a: VectorType, b: VectorType): VectorType;
	  multiplyVectors(a: VectorType, b: VectorType): VectorType;

	  addScaledVector(a: VectorType, b: VectorType): VectorType;
	}

}
declare module '@math.gl/core/dist/es5/classes/vector2' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from './base/vector';

	/* Two-element vector class */
	export default class Vector2 extends Vector<Vector2> {
	  static ZERO: number[];
	  // Getters/setters
	  ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number);

	  set(x: number, y: number): Vector2;

	  copy(array: readonly number[]): Vector2;

	  fromObject(object): Vector2;
	  //  {
	  //   if (config.debug) {
	  //     checkNumber(object.x);
	  //     checkNumber(object.y);
	  //   }
	  //   this[0] = object.x;
	  //   this[1] = object.y;
	  //   return this.check();
	  // }

	  toObject(object: object): object;

	  // x,y inherited from Vector

	  horizontalAngle(): number;

	  verticalAngle(): number;

	  // Transforms
	  transform(matrix4: readonly number[]): Vector2;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector2;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector2;

	  transformByMatrix3(matrix3: readonly number[]): Vector2;
	  transformByMatrix2x3(matrix2x3: readonly number[]): Vector2;
	  transformByMatrix2(matrix2: readonly number[]): Vector2;
	}

}
declare module '@math.gl/core/dist/es5/classes/vector3' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from './base/vector';

	/** Three-element vector class */
	export default class Vector3 extends Vector<Vector3> {
	  static readonly ZERO: Vector3;
	  readonly ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number, z: number);

	  set(x: number, y: number, z: number);

	  copy(array: readonly number[]);

	  fromObject(object);
	  toObject(object);

	  // x,y inherited from Vector

	  z: number;

	  // ACCESSORS
	  angle(vector: readonly number[]): number;

	  // MODIFIERS
	  cross(vector: readonly number[]): Vector3;

	  rotateX(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateY(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateZ(args: {radians: number; origin?: readonly number[]}): Vector3;

	  // Transforms

	  // transforms as point (4th component is implicitly 1)
	  transform(matrix4: readonly number[]): Vector3;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector3;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector3;

	  transformByMatrix3(matrix3: readonly number[]): Vector3;
	  transformByMatrix2(matrix2: readonly number[]): Vector3;
	  transformByQuaternion(quaternion: readonly number[]): Vector3;
	}

}
declare module '@math.gl/core/dist/es5/classes/vector4' {
	import Vector from './base/vector';

	/** Four-element vector class */
	export default class Vector4 extends Vector<Vector4> {
	  static ZERO: number[];

	  ELEMENTS: number;

	  /** construct a new Vector4 initialize to [0, 0, 0, 0] */
	  constructor();
	  /** construct a new Vector4 initialize to ...x, y, z, w */
	  constructor(x: number, y: number, z: number, w: number);
	  /** construct a new Vector4 initialize to array [x, y, z, w] */
	  constructor(array: readonly number[]);

	  set(x, y, z, w);

	  copy(array);

	  fromObject(object);

	  toObject(object);

	  // x,y inherited from Vector
	  z: number;
	  w: number;

	  transform(matrix4: readonly number[]): Vector4;
	  transformByMatrix3(matrix3: readonly number[]): Vector4;
	  transformByMatrix2(matrix2: readonly number[]): Vector4;
	  transformByQuaternion(quaternion: readonly number[]): Vector4;

	  // three.js compatibility
	  applyMatrix4(m: readonly number[]): Vector4;
	}

}
declare module '@math.gl/core/dist/es5/classes/base/matrix' {
	import MathArray from './math-array';

	export default class Matrix<MatrixType> extends MathArray<MatrixType> {
	  toString(): string;

	  getElementIndex(row: number, col: number): number;
	  // By default assumes row major indices
	  getElement(row: number, col: number);
	  // By default assumes row major indices
	  setElement(row: number, col: number, value: number);
	  getColumn(columnIndex: number, result?: number[]);
	  setColumn(columnIndex: number, columnVector: number[]);
	}

}
declare module '@math.gl/core/dist/es5/classes/matrix3' {
	import Matrix from './base/matrix';
	// import Quaternion from './quaternion';

	export default class Matrix3 extends Matrix<Matrix3> {
	  static IDENTITY: Matrix3;
	  static ZERO: Matrix3;

	  // inherited
	  // ELEMENTS: number;
	  // RANK: number;
	  INDICES: number[];

	  constructor();
	  constructor(array: number[]);
	  constructor(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  copy(array): Matrix3;

	  // accepts column major order, stores in column major order
	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  // accepts row major order, stores as column major
	  // eslint-disable-next-line max-params
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m20: number,
	    m21: number,
	    m22: number
	  );
	  setRowMajor(...array: number[]);

	  // Accessors
	  determinant(): number;

	  // Constructors
	  identity(): Matrix3;

	  // Calculates a 3x3 matrix from the given quaternion
	  // q quat  Quaternion to create matrix from
	  fromQuaternion(q: number[]): Matrix3;

	  // Modifiers
	  transpose(): Matrix3;
	  invert(): Matrix3;

	  // Operations
	  multiplyLeft(a: Matrix3): Matrix3;
	  multiplyRight(a: Matrix3): Matrix3;

	  rotate(radians: number): Matrix3;

	  scale(scale: number): Matrix3;
	  scale([scaleX, scaleY, scaleZ]: number[]): Matrix3;

	  translate(vec): Matrix3;

	  // Transforms

	  transform(vector: number[], result?: number[]): number[];

	  // DEPRECATED IN 3.0
	  transformVector(vector, result);
	  transformVector2(vector, result);
	  transformVector3(vector, result);
	}

}
declare module '@math.gl/core/dist/es5/classes/matrix4' {
	import Matrix from './base/matrix';
	// import Quaternion from './quaternion';

	type Array16 = number[];
	// = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

	export default class Matrix4 extends Matrix<Matrix4> {
	  static IDENTITY: number[];
	  static ZERO: number[];
	  INDICES: number[];
	  // get ELEMENTS()
	  // get RANK()

	  constructor();
	  constructor(array: Array16);

	  copy(array: Array16);

	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );

	  toRowMajor(result: Array16);

	  identity(): Matrix4;

	  // Calculates a 4x4 matrix from the given quaternion
	  fromQuaternion(q: number[]): Matrix4;

	  // Generates a frustum matrix with the given bounds
	  frustum(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates a look-at matrix with the given eye position, focal point, and up axis
	  lookAt(eye: number[], center: number[], up: number[]): Matrix4;
	  lookAt(args: {eye: number[]; center?: number[]; up: number[]}): Matrix4;

	  // Generates a orthogonal projection matrix with the given bounds
	  ortho(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates an orthogonal projection matrix with the same parameters
	  orthographic(args: {
	    fovy: number;
	    aspect?: number;
	    focalDistance?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Generates a perspective projection matrix with the given bounds
	  perspective(args: {
	    fovy?: number;
	    fov?: number;
	    aspect?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Accessors

	  determinant(): Matrix4;

	  // Decomposition
	  // Extracts the non-uniform scale assuming the matrix is an affine transformation.
	  // The scales are the "lengths" of the column vectors in the upper-left 3x3 matrix.
	  getScale(result?: number[]): Matrix4;
	  // Gets the translation portion, assuming the matrix is a affine transformation matrix.
	  getTranslation(result?: number[]): Matrix4;
	  // Gets upper left 3x3 pure rotation matrix (non-scaling), assume affine transformation matrix
	  getRotation(result?: number[], scaleResult?: number[]);
	  getRotationMatrix3(result?: number[], scaleResult?: number[]);

	  // Modifiers
	  transpose(): Matrix4;
	  invert(): Matrix4;

	  // Operations
	  multiplyLeft(a: number[]): Matrix4;
	  multiplyRight(a: number[]): Matrix4;

	  scale(factor): Matrix4;
	  translate(vec): Matrix4;
	  rotateX(radians: number): Matrix4;
	  rotateY(radians: number): Matrix4;
	  rotateZ(radians: number): Matrix4;
	  rotateXYZ([rx, ry, rz]: number[]): Matrix4;
	  rotateAxis(radians, axis): Matrix4;

	  // Transforms

	  // Transforms any 2, 3 or 4 element vector. 2 and 3 elements are treated as points
	  transform(vector: number[], result: number[]): number[];

	  // Transforms any 2 or 3 element array as point (w implicitly 1)
	  transformAsPoint(vector: number[], result: number[]): number[];
	  transformAsVector(vector: number[], result: number[]): number[];

	  // three.js math API compatibility
	  makeRotationX(radians: number): Matrix4;
	  makeTranslation(x: number, y: number, z: number): Matrix4;

	  // DEPRECATED in 3.0
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformPoint(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformVector(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformDirection(vector: number[], result?: number[]): number[];
	}

}
declare module '@math.gl/core/dist/es5/classes/quaternion' {
	import MathArray from './base/math-array';

	export default class Quaternion extends MathArray<Quaternion> {
	  // Getters/setters
	  ELEMENTS: number;

	  x: number;
	  y: number;
	  z: number;
	  w: number;

	  /** Creates a new identity quaternion: `w^2 + x^2 + y^2 + z^2 = 1` */
	  constructor();
	  constructor(q: Quaternion);
	  constructor(q: readonly number[]);
	  constructor(x: number, y: number, z: number, w: number);

	  copy(array: readonly number[]): Quaternion;

	  set(x: number, y: number, z: number, w: number): Quaternion;

	  /**
	   * Creates a quaternion from the given 3x3 rotation matrix.
	   *
	   * - The resultant quaternion is not normalized, so you should
	   * be sure to renormalize the quaternion yourself where necessary.
	   */
	  fromMatrix3(m: readonly number[]): Quaternion;

	  fromAxisRotation(axis, rad): Quaternion;

	  /** Set a quat to the identity quaternion */
	  identity(): Quaternion;

	  // Set the components of a quaternion to the given values
	  // set(i, j, k, l) {
	  //   quat.set(this, i, j, k, l);
	  //   return this.check();
	  // }

	  /** Sets a quaternion from the given angle and rotation axis, then returns it. */
	  setAxisAngle(axis, rad): Quaternion;

	  /** Calculates the length of a quaternion */
	  len(): number;

	  /** Calculates the squared length of a quaternion */
	  lengthSquared(): number;

	  /** Calculates the dot product of two quaternions */
	  dot(a: readonly number[]): number;

	  rotationTo(vectorA, vectorB): Quaternion;

	  /** Adds two quaternions */
	  add(a: readonly number[]): Quaternion;

	  /**
	   * Calculates the W component of a quat from the X, Y, and Z components.
	   * Any existing W component will be ignored.
	   */
	  calculateW(): Quaternion;

	  /**
	   * Calculates the conjugate of a quat If the quaternion is normalized,
	   * this function is faster than quat.inverse and produces the same result.
	   */
	  conjugate(): Quaternion;

	  /** Calculates the inverse of this quaternion */
	  invert(): Quaternion;

	  /** Performs a linear interpolation between two quaternions */
	  lerp(a, b, t): Quaternion;

	  /** Multiplies two quaternions */
	  multiplyRight(a, b): Quaternion;
	  /** Multiplies two quaternions */
	  multiplyLeft(a, b): Quaternion;

	  /** Normalize a quaternion */
	  normalize(): Quaternion;

	  // MODIFIERS

	  /** Rotates a quaternion by the given angle about the X axis */
	  rotateX(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Y axis */
	  rotateY(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Z axis */
	  rotateZ(radians: number): Quaternion;

	  /** Scales a quaternion by a scalar number */
	  scale(b: number): Quaternion;

	  /** Performs a spherical linear interpolation between two quaternions */
	  slerp(start: readonly number[], target: readonly number[], ratio: number): Quaternion;
	  slerp(args: {start: readonly number[]; target: readonly number[]; ratio: number}): Quaternion;

	  transformVector4(vector, result?);

	  // THREE.js Math API compatibility
	  lengthSq(): Quaternion;
	  setFromAxisAngle(axis, rad): Quaternion;
	  premultiply(a, b): Quaternion;
	  multiply(a, b): Quaternion;
	}

}
declare module '@math.gl/core/dist/es5/classes/spherical-coordinates' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	// Adaptation of THREE.js Spherical class, under MIT license
	import Vector3 from './vector3';

	type SphericalCoordinatesOptions = {
	  phi?: number;
	  theta?: number;
	  radius?: number;
	  bearing?: number;
	  pitch?: number;
	  altitude?: number;
	  radiusScale?: number;
	};

	type FormatOptions = {
	  printTypes?: boolean;
	};

	/**
	 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
	 * The poles (phi) are at the positive and negative y axis.
	 * The equator starts at positive z.
	 */
	export default class SphericalCoordinates {
	  // Todo [rho, theta, phi] ?

	  // Cartographic (bearing 0 north, pitch 0 look from above)
	  bearing: number;
	  pitch: number;
	  altitude: number;

	  // lnglatZ coordinates
	  longitude: number;
	  latitude: number;
	  lng: number;
	  lat: number;
	  z: number;

	  /**
	   * @param {Object} options
	   * @param {Number} [options.phi] =0 - rotation around X (latitude)
	   * @param {Number} [options.theta] =0 - rotation around Y (longitude)
	   * @param {Number} [options.radius] =1 - Distance from center
	   * @param {Number} [options.bearing]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.altitude]
	   * @param {Number} [options.radiusScale] =1
	   */
	  constructor(options?: SphericalCoordinatesOptions);

	  fromLngLatZ(lngLatZ: number[]): SphericalCoordinates;
	  fromVector3(v: number[]): SphericalCoordinates;

	  clone(): SphericalCoordinates;
	  copy(other: SphericalCoordinates): SphericalCoordinates;
	  set(radius: number, phi: number, theta: number): SphericalCoordinates;

	  equals(other: SphericalCoordinates): boolean;
	  exactEquals(other: SphericalCoordinates): boolean;

	  toString(): string;
	  formatString(options?: FormatOptions): string;
	  toVector3(): Vector3;

	  // restrict phi to be betwee EPS and PI-EPS
	  makeSafe(): SphericalCoordinates;
	  check(): SphericalCoordinates;
	}

}
declare module '@math.gl/core/dist/es5/classes/euler' {
	import MathArray from './base/math-array';
	import Quaternion from './quaternion';
	import Matrix3 from './matrix3';

	export default class Euler extends MathArray<Euler> {
	  static ZYX: number;
	  static YXZ: number;
	  static XZY: number;
	  static ZXY: number;
	  static YZX: number;
	  static XYZ: number;
	  static RollPitchYaw: number;
	  static DefaultOrder: number;
	  static RotationOrders: string[];

	  static rotationOrder(order: number): string;

	  ELEMENTS: number;

	  /**
	   * @class
	   * @param {Number | Number[]} x
	   * @param {Number=} [y]
	   * @param {Number=} [z]
	   * @param {Number=} [order]
	   */
	  constructor();
	  constructor(x: number, y: number, z: number, order?: number);
	  constructor(vector3: number[], order?: number);

	  fromQuaternion(quaternion: Quaternion): Euler;

	  // If copied array does contain fourth element, preserves currently set order
	  copy(array: number[]): Euler;

	  // Sets the three angles, and optionally sets the rotation order
	  // If order is not specified, preserves currently set order
	  set(x: number, y: number, z: number, order?: number): Euler;

	  validate(): boolean;

	  // Does not copy the orientation element
	  toArray(array?: number[], offset?: number): number[];

	  // Copies the orientation element
	  toArray4(array?: number[], offset?: number): number[];

	  toVector3(result?: number[]): number[];

	  // x, y, z angle notation (note: only corresponds to axis in XYZ orientation)
	  x: number;
	  y: number;
	  z: number;

	  // alpha, beta, gamma angle notation
	  alpha: number;
	  beta: number;
	  gamma: number;

	  // phi, theta, psi angle notation
	  phi: number;
	  theta: number;
	  psi: number;

	  // roll, pitch, yaw angle notation
	  roll: number;
	  pitch: number;
	  yaw: number;

	  // rotation order, in all three angle notations
	  order: number;

	  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */

	  // Constructors
	  fromVector3(v: number[], order: number): Euler;
	  // TODO - with and without 4th element
	  fromArray(array: number[], offset?: number): Euler;

	  // Common ZYX rotation order
	  fromRollPitchYaw(roll: number, pitch: number, yaw: number): Euler;
	  fromRotationMatrix(m: number[], order?: number): Euler;

	  // ACCESSORS

	  getRotationMatrix(m: Matrix3): Matrix3;
	  getRotationMatrix(m?: number[]): number[];

	  // TODO - move to Quaternion
	  getQuaternion(): Quaternion;
	  toQuaternion(): Quaternion;
	}

}
declare module '@math.gl/core/dist/es5/classes/pose' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.
	import Matrix4 from './matrix4';
	import Vector3 from './vector3';
	import Euler from './euler';

	type PoseOptions = {
	  position?: number[];
	  orientation?: number[];
	  x?: number;
	  y?: number;
	  z?: number;
	  roll?: number;
	  pitch?: number;
	  yaw?: number;
	};

	export default class Pose {
	  /**
	   * A pose contains both rotation and rotations.
	   * Note that every single pose defines its own coordinate system
	   * (with the position of the pose in the origin, and zero rotations).
	   * These "pose relative" coordinate will be centered on the defining
	   * pose's position and with with the defining pose's orientation
	   * aligned with axis.
	   * @param {Object} options
	   * @param {Number[]} [options.position]
	   * @param {Number[]} [options.orientation]
	   * @param {Number} [options.x]
	   * @param {Number} [options.y]
	   * @param {Number} [options.z]
	   * @param {Number} [options.roll]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.yaw]
	   */
	  constructor(options?: PoseOptions);

	  x: number;
	  y: number;
	  z: number;
	  roll: number;
	  pitch: number;
	  yaw: number;

	  getPosition(): Vector3;
	  getOrientation(): Euler;

	  equals(pose: Pose): boolean;
	  exactEquals(pose: Pose): boolean;

	  /**
	   * Returns a 4x4 matrix that transforms a coordinates (in the same
	   * coordinate system as this pose) into the "pose-relative" coordinate
	   * system defined by this pose.
	   * The pose relative coordinates with have origin in the position of this
	   * pose, and axis will be aligned with the rotation of this pose.
	   */
	  getTransformationMatrix(): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * second coordinate system into the coordinate system of this pose.
	   */
	  getTransformationMatrixFromPose(pose: Pose): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * coordinate system of this pose into the coordinate system of the second pose.
	   *
	   * Note: This method returns the inverse of `this.getTransformationMatrixFromPose(pose)`
	   */
	  getTransformationMatrixToPose(pose: Pose): Matrix4;
	}

}
declare module 'dist/es5' {
	// lib
	export * from './lib/common';

	// classes
	export {default as Vector2} from './classes/vector2';
	export {default as Vector3} from './classes/vector3';
	export {default as Vector4} from './classes/vector4';
	export {default as Matrix3} from './classes/matrix3';
	export {default as Matrix4} from './classes/matrix4';
	export {default as Quaternion} from './classes/quaternion';

	// extras

	// export {checkNumber} from './lib/validators';
	export function assert(condition: boolean, message?: string): void;

	// experimental
	export {default as SphericalCoordinates} from './classes/spherical-coordinates';
	export {default as Pose} from './classes/pose';
	export {default as Euler} from './classes/euler';

	export const _MathUtils: {
	  EPSILON1: number;
	  EPSILON2: number;
	  EPSILON3: number;
	  EPSILON4: number;
	  EPSILON5: number;
	  EPSILON6: number;
	  EPSILON7: number;
	  EPSILON8: number;
	  EPSILON9: number;
	  EPSILON10: number;
	  EPSILON11: number;
	  EPSILON12: number;
	  EPSILON13: number;
	  EPSILON14: number;
	  EPSILON15: number;
	  EPSILON16: number;
	  EPSILON17: number;
	  EPSILON18: number;
	  EPSILON19: number;
	  EPSILON20: number;

	  PI_OVER_TWO: number;
	  PI_OVER_FOUR: number;
	  PI_OVER_SIX: number;

	  TWO_PI: number;
	};

	// DEPRECATED
	export {default as _SphericalCoordinates} from './classes/spherical-coordinates';
	export {default as _Pose} from './classes/pose';
	export {default as _Euler} from './classes/euler';

}
declare module '@math.gl/core/lib/assert' {
	export default function assert(condition: any, message: any): void;

}
declare module '@math.gl/core/lib/common' {
	 const config: {};
	export { config };
	export function configure(options?: {}): {};
	export function formatValue(value: any, { precision }?: {
	    precision?: any;
	}): string;
	export function isArray(value: any): boolean;
	export function clone(array: any): any;
	export function toRadians(degrees: any): any;
	export function toDegrees(radians: any): any;
	export function radians(degrees: any, result: any): any;
	export function degrees(radians: any, result: any): any;
	export function sin(radians: any): any;
	export function cos(radians: any): any;
	export function tan(radians: any): any;
	export function asin(radians: any): any;
	export function acos(radians: any): any;
	export function atan(radians: any): any;
	export function clamp(value: any, min: any, max: any): any;
	export function lerp(a: any, b: any, t: any): any;
	export function equals(a: any, b: any, epsilon: any): any;
	export function exactEquals(a: any, b: any): any;
	export function withEpsilon(EPSILON: any, func: any): any;

}
declare module '@math.gl/core/classes/base/math-array' {
	export default class MathArray extends Array {
	    get ELEMENTS(): number;
	    get RANK(): number;
	    clone(): any;
	    from(arrayOrObject: any): any;
	    fromArray(array: any, offset?: number): this;
	    to(arrayOrObject: any): any;
	    toTarget(target: any): any;
	    toArray(array?: any[], offset?: number): any[];
	    toFloat32Array(): Float32Array;
	    toString(): string;
	    formatString(opts: any): string;
	    equals(array: any): boolean;
	    exactEquals(array: any): boolean;
	    negate(): this;
	    lerp(a: any, b: any, t: any): this;
	    min(vector: any): this;
	    max(vector: any): this;
	    clamp(minVector: any, maxVector: any): this;
	    add(...vectors: any[]): this;
	    subtract(...vectors: any[]): this;
	    scale(scale: any): any;
	    sub(a: any): this;
	    setScalar(a: any): this;
	    addScalar(a: any): this;
	    subScalar(a: any): this;
	    multiplyScalar(scalar: any): this;
	    divideScalar(a: any): any;
	    clampScalar(min: any, max: any): this;
	    multiplyByScalar(scalar: any): any;
	    get elements(): this;
	    check(): this;
	    validate(): boolean;
	}

}
declare module '@math.gl/core/lib/validators' {
	export function validateVector(v: any, length: any): boolean;
	export function checkNumber(value: any): any;
	export function checkVector(v: any, length: any, callerName?: string): any;
	export function deprecated(method: any, version: any): void;

}
declare module '@math.gl/core/classes/base/vector' {
	import MathArray from '@math.gl/core/classes/base/math-array';
	export default class Vector extends MathArray {
	    copy(vector: any): this;
	    get x(): any;
	    set x(value: any);
	    get y(): any;
	    set y(value: any);
	    len(): number;
	    magnitude(): number;
	    lengthSquared(): number;
	    magnitudeSquared(): number;
	    distance(mathArray: any): number;
	    distanceSquared(mathArray: any): any;
	    dot(mathArray: any): any;
	    normalize(): this;
	    multiply(...vectors: any[]): this;
	    divide(...vectors: any[]): this;
	    lengthSq(): number;
	    distanceTo(vector: any): number;
	    distanceToSquared(vector: any): any;
	    getComponent(i: any): any;
	    setComponent(i: any, value: any): this;
	    addVectors(a: any, b: any): this;
	    subVectors(a: any, b: any): this;
	    multiplyVectors(a: any, b: any): this;
	    addScaledVector(a: any, b: any): this;
	}

}
declare module '@math.gl/core/lib/gl-matrix-extras' {
	export function vec2_transformMat4AsVector(out: any, a: any, m: any): any;
	export function vec3_transformMat4AsVector(out: any, a: any, m: any): any;
	export function vec3_transformMat2(out: any, a: any, m: any): any;
	export function vec4_transformMat2(out: any, a: any, m: any): any;
	export function vec4_transformMat3(out: any, a: any, m: any): any;

}
declare module '@math.gl/core/classes/vector2' {
	import Vector from '@math.gl/core/classes/base/vector';
	export default class Vector2 extends Vector {
	    constructor(x?: number, y?: number);
	    set(x: any, y: any): this;
	    copy(array: any): this;
	    fromObject(object: any): this;
	    toObject(object: any): any;
	    get ELEMENTS(): number;
	    horizontalAngle(): number;
	    verticalAngle(): number;
	    transform(matrix4: any): this;
	    transformAsPoint(matrix4: any): this;
	    transformAsVector(matrix4: any): this;
	    transformByMatrix3(matrix3: any): this;
	    transformByMatrix2x3(matrix2x3: any): this;
	    transformByMatrix2(matrix2: any): this;
	}

}
declare module '@math.gl/core/classes/vector3' {
	import Vector from '@math.gl/core/classes/base/vector';
	export default class Vector3 extends Vector {
	    static get ZERO(): any;
	    /**
	     * @class
	     * @param {Number | [Number, Number, Number]} x
	     * @param {Number} y - rotation around X (latitude)
	     * @param {Number} z - rotation around X (latitude)
	     */
	    constructor(x?: number, y?: number, z?: number);
	    set(x: any, y: any, z: any): this;
	    copy(array: any): this;
	    fromObject(object: any): this;
	    toObject(object: any): any;
	    get ELEMENTS(): number;
	    get z(): any;
	    set z(value: any);
	    angle(vector: any): any;
	    cross(vector: any): this;
	    rotateX({ radians, origin }: {
	        radians: any;
	        origin?: number[];
	    }): this;
	    rotateY({ radians, origin }: {
	        radians: any;
	        origin?: number[];
	    }): this;
	    rotateZ({ radians, origin }: {
	        radians: any;
	        origin?: number[];
	    }): this;
	    transform(matrix4: any): this;
	    transformAsPoint(matrix4: any): this;
	    transformAsVector(matrix4: any): this;
	    transformByMatrix3(matrix3: any): this;
	    transformByMatrix2(matrix2: any): this;
	    transformByQuaternion(quaternion: any): this;
	}

}
declare module '@math.gl/core/classes/vector4' {
	import Vector from '@math.gl/core/classes/base/vector';
	export default class Vector4 extends Vector {
	    static get ZERO(): any;
	    constructor(x?: number, y?: number, z?: number, w?: number);
	    set(x: any, y: any, z: any, w: any): this;
	    copy(array: any): this;
	    fromObject(object: any): this;
	    toObject(object: any): any;
	    get ELEMENTS(): number;
	    get z(): any;
	    set z(value: any);
	    get w(): any;
	    set w(value: any);
	    transform(matrix4: any): this;
	    transformByMatrix3(matrix3: any): this;
	    transformByMatrix2(matrix2: any): this;
	    transformByQuaternion(quaternion: any): this;
	    applyMatrix4(m: any): this;
	}

}
declare module '@math.gl/core/classes/base/matrix' {
	import MathArray from '@math.gl/core/classes/base/math-array';
	export default class Matrix extends MathArray {
	    toString(): string;
	    getElementIndex(row: any, col: any): any;
	    getElement(row: any, col: any): any;
	    setElement(row: any, col: any, value: any): this;
	    getColumn(columnIndex: any, result?: any[]): any[];
	    setColumn(columnIndex: any, columnVector: any): this;
	}

}
declare module '@math.gl/core/classes/matrix3' {
	import Matrix from '@math.gl/core/classes/base/matrix';
	export default class Matrix3 extends Matrix {
	    static get IDENTITY(): any;
	    static get ZERO(): any;
	    get ELEMENTS(): number;
	    get RANK(): number;
	    get INDICES(): Readonly<{
	        COL0ROW0: number;
	        COL0ROW1: number;
	        COL0ROW2: number;
	        COL1ROW0: number;
	        COL1ROW1: number;
	        COL1ROW2: number;
	        COL2ROW0: number;
	        COL2ROW1: number;
	        COL2ROW2: number;
	    }>;
	    constructor(array: any);
	    copy(array: any): this;
	    set(m00: any, m10: any, m20: any, m01: any, m11: any, m21: any, m02: any, m12: any, m22: any): this;
	    setRowMajor(m00: any, m01: any, m02: any, m10: any, m11: any, m12: any, m20: any, m21: any, m22: any): this;
	    determinant(): any;
	    identity(): this;
	    fromQuaternion(q: any): this;
	    transpose(): this;
	    invert(): this;
	    multiplyLeft(a: any): this;
	    multiplyRight(a: any): this;
	    rotate(radians: any): this;
	    scale(factor: any): this;
	    translate(vec: any): this;
	    transform(vector: any, result: any): any;
	    transformVector(vector: any, result: any): any;
	    transformVector2(vector: any, result: any): any;
	    transformVector3(vector: any, result: any): any;
	}

}
declare module '@math.gl/core/classes/matrix4' {
	import Matrix from '@math.gl/core/classes/base/matrix';
	export default class Matrix4 extends Matrix {
	    static get IDENTITY(): any;
	    static get ZERO(): any;
	    get INDICES(): Readonly<{
	        COL0ROW0: number;
	        COL0ROW1: number;
	        COL0ROW2: number;
	        COL0ROW3: number;
	        COL1ROW0: number;
	        COL1ROW1: number;
	        COL1ROW2: number;
	        COL1ROW3: number;
	        COL2ROW0: number;
	        COL2ROW1: number;
	        COL2ROW2: number;
	        COL2ROW3: number;
	        COL3ROW0: number;
	        COL3ROW1: number;
	        COL3ROW2: number;
	        COL3ROW3: number;
	    }>;
	    get ELEMENTS(): number;
	    get RANK(): number;
	    constructor(array: any);
	    copy(array: any): this;
	    set(m00: any, m10: any, m20: any, m30: any, m01: any, m11: any, m21: any, m31: any, m02: any, m12: any, m22: any, m32: any, m03: any, m13: any, m23: any, m33: any): this;
	    setRowMajor(m00: any, m01: any, m02: any, m03: any, m10: any, m11: any, m12: any, m13: any, m20: any, m21: any, m22: any, m23: any, m30: any, m31: any, m32: any, m33: any): this;
	    toRowMajor(result: any): any;
	    identity(): this;
	    fromQuaternion(q: any): this;
	    frustum({ left, right, bottom, top, near, far }: {
	        left: any;
	        right: any;
	        bottom: any;
	        top: any;
	        near: any;
	        far: any;
	    }): this;
	    static _computeInfinitePerspectiveOffCenter(result: any, left: any, right: any, bottom: any, top: any, near: any): any;
	    lookAt(eye: any, center: any, up: any): this;
	    ortho({ left, right, bottom, top, near, far }: {
	        left: any;
	        right: any;
	        bottom: any;
	        top: any;
	        near?: number;
	        far?: number;
	    }): this;
	    orthographic({ fovy, aspect, focalDistance, near, far }: {
	        fovy?: number;
	        aspect?: number;
	        focalDistance?: number;
	        near?: number;
	        far?: number;
	    }): Matrix4;
	    perspective({ fovy, fov, // DEPRECATED
	    aspect, near, far }?: {
	        fovy?: any;
	        fov?: number;
	        aspect?: number;
	        near?: number;
	        far?: number;
	    }): this;
	    determinant(): any;
	    getScale(result?: number[]): number[];
	    getTranslation(result?: number[]): number[];
	    getRotation(result?: number[], scaleResult?: any): number[];
	    getRotationMatrix3(result?: number[], scaleResult?: any): number[];
	    transpose(): this;
	    invert(): this;
	    multiplyLeft(a: any): this;
	    multiplyRight(a: any): this;
	    rotateX(radians: any): this;
	    rotateY(radians: any): this;
	    rotateZ(radians: any): this;
	    rotateXYZ([rx, ry, rz]: [any, any, any]): this;
	    rotateAxis(radians: any, axis: any): this;
	    scale(factor: any): this;
	    translate(vec: any): this;
	    transform(vector: any, result: any): any;
	    transformAsPoint(vector: any, result: any): any;
	    transformAsVector(vector: any, result: any): any;
	    makeRotationX(radians: any): this;
	    makeTranslation(x: any, y: any, z: any): this;
	    transformPoint(vector: any, result: any): any;
	    transformVector(vector: any, result: any): any;
	    transformDirection(vector: any, result: any): any;
	}

}
declare module '@math.gl/core/classes/quaternion' {
	import MathArray from '@math.gl/core/classes/base/math-array';
	export default class Quaternion extends MathArray {
	    constructor(x?: number, y?: number, z?: number, w?: number);
	    copy(array: any): this;
	    set(x: any, y: any, z: any, w: any): this;
	    fromMatrix3(m: any): this;
	    identity(): this;
	    fromAxisRotation(axis: any, rad: any): this;
	    setAxisAngle(axis: any, rad: any): this;
	    get ELEMENTS(): number;
	    get x(): any;
	    set x(value: any);
	    get y(): any;
	    set y(value: any);
	    get z(): any;
	    set z(value: any);
	    get w(): any;
	    set w(value: any);
	    len(): any;
	    lengthSquared(): any;
	    dot(a: any, b: any): any;
	    rotationTo(vectorA: any, vectorB: any): this;
	    add(a: any, b: any): this;
	    calculateW(): this;
	    conjugate(): this;
	    invert(): this;
	    lerp(a: any, b: any, t: any): this;
	    multiplyRight(a: any, b: any): this;
	    multiplyLeft(a: any, b: any): this;
	    normalize(): this;
	    rotateX(rad: any): this;
	    rotateY(rad: any): this;
	    rotateZ(rad: any): this;
	    scale(b: any): this;
	    slerp(start: any, target: any, ratio: any): this;
	    transformVector4(vector: any, result?: any): any;
	    lengthSq(): any;
	    setFromAxisAngle(axis: any, rad: any): this;
	    premultiply(a: any, b: any): this;
	    multiply(a: any, b: any): this;
	}

}
declare module '@math.gl/core/classes/spherical-coordinates' {
	import Vector3 from '@math.gl/core/classes/vector3';
	export default class SphericalCoordinates {
	    constructor({ phi, theta, radius, bearing, pitch, altitude, radiusScale }?: {
	        phi?: number;
	        theta?: number;
	        radius?: number;
	        bearing?: any;
	        pitch?: any;
	        altitude?: any;
	        radiusScale?: number;
	    });
	    toString(): string;
	    formatString({ printTypes }: {
	        printTypes?: boolean;
	    }): string;
	    equals(other: any): any;
	    exactEquals(other: any): boolean;
	    get bearing(): number;
	    set bearing(v: number);
	    get pitch(): any;
	    set pitch(v: any);
	    get longitude(): any;
	    get latitude(): any;
	    get lng(): any;
	    get lat(): any;
	    get z(): number;
	    set(radius: any, phi: any, theta: any): this;
	    clone(): SphericalCoordinates;
	    copy(other: any): this;
	    fromLngLatZ([lng, lat, z]: [any, any, any]): void;
	    fromVector3(v: any): this;
	    toVector3(): Vector3;
	    makeSafe(): this;
	    check(): this;
	}

}
declare module '@math.gl/core/classes/euler' {
	import MathArray from '@math.gl/core/classes/base/math-array';
	import Quaternion from '@math.gl/core/classes/quaternion';
	export default class Euler extends MathArray {
	    static get ZYX(): number;
	    static get YXZ(): number;
	    static get XZY(): number;
	    static get ZXY(): number;
	    static get YZX(): number;
	    static get XYZ(): number;
	    static get RollPitchYaw(): number;
	    static get DefaultOrder(): number;
	    static get RotationOrders(): string[];
	    static rotationOrder(order: any): string;
	    get ELEMENTS(): number;
	    /**
	     * @class
	     * @param {Number | Number[]} x
	     * @param {Number=} [y]
	     * @param {Number=} [z]
	     * @param {Number=} [order]
	     */
	    constructor(x?: number, y?: number, z?: number, order?: number);
	    fromQuaternion(quaternion: any): Euler;
	    copy(array: any): this;
	    set(x: number, y: number, z: number, order: any): this;
	    validate(): boolean;
	    toArray(array?: any[], offset?: number): any[];
	    toArray4(array?: any[], offset?: number): any[];
	    toVector3(result?: number[]): number[];
	    /** @type {number} */
	    get x(): any;
	    set x(value: any);
	    /** @type {number} */
	    get y(): any;
	    set y(value: any);
	    /** @type {number} */
	    get z(): any;
	    set z(value: any);
	    get alpha(): any;
	    set alpha(value: any);
	    get beta(): any;
	    set beta(value: any);
	    get gamma(): any;
	    set gamma(value: any);
	    get phi(): any;
	    set phi(value: any);
	    get theta(): any;
	    set theta(value: any);
	    get psi(): any;
	    set psi(value: any);
	    /** @type {number} */
	    get roll(): any;
	    set roll(value: any);
	    /** @type {number} */
	    get pitch(): any;
	    set pitch(value: any);
	    /** @type {number} */
	    get yaw(): any;
	    set yaw(value: any);
	    get order(): any;
	    set order(value: any);
	    fromVector3(v: any, order: any): this;
	    fromArray(array: any, offset?: number): this;
	    fromRollPitchYaw(roll: any, pitch: any, yaw: any): this;
	    fromRotationMatrix(m: any, order?: number): this;
	    getRotationMatrix(m: any): any;
	    getQuaternion(): Quaternion;
	    _fromRotationMatrix(m: any, order?: number): this;
	    _getRotationMatrix(result: any): any;
	    toQuaternion(): Quaternion;
	}

}
declare module '@math.gl/core/classes/pose' {
	import Matrix4 from '@math.gl/core/classes/matrix4';
	export default class Pose {
	    constructor({ x, y, z, roll, pitch, yaw, position, orientation }?: {
	        x?: number;
	        y?: number;
	        z?: number;
	        roll?: number;
	        pitch?: number;
	        yaw?: number;
	        position?: any;
	        orientation?: any;
	    });
	    get x(): any;
	    set x(value: any);
	    get y(): any;
	    set y(value: any);
	    get z(): any;
	    set z(value: any);
	    get roll(): any;
	    set roll(value: any);
	    get pitch(): any;
	    set pitch(value: any);
	    get yaw(): any;
	    set yaw(value: any);
	    getPosition(): any;
	    getOrientation(): any;
	    equals(pose: any): any;
	    exactEquals(pose: any): any;
	    getTransformationMatrix(): Matrix4;
	    getTransformationMatrixFromPose(pose: any): Matrix4;
	    getTransformationMatrixToPose(pose: any): Matrix4;
	}

}
declare module 'src' {
	// lib
	export * from '@math.gl/core/src/lib/common';

	// classes
	export {default as Vector2} from '@math.gl/core/src/classes/vector2';
	export {default as Vector3} from '@math.gl/core/src/classes/vector3';
	export {default as Vector4} from '@math.gl/core/src/classes/vector4';
	export {default as Matrix3} from '@math.gl/core/src/classes/matrix3';
	export {default as Matrix4} from '@math.gl/core/src/classes/matrix4';
	export {default as Quaternion} from '@math.gl/core/src/classes/quaternion';

	// extras

	// export {checkNumber} from './lib/validators';
	export function assert(condition: boolean, message?: string): void;

	// experimental
	export {default as SphericalCoordinates} from '@math.gl/core/src/classes/spherical-coordinates';
	export {default as Pose} from '@math.gl/core/src/classes/pose';
	export {default as Euler} from '@math.gl/core/src/classes/euler';

	export const _MathUtils: {
	  EPSILON1: number;
	  EPSILON2: number;
	  EPSILON3: number;
	  EPSILON4: number;
	  EPSILON5: number;
	  EPSILON6: number;
	  EPSILON7: number;
	  EPSILON8: number;
	  EPSILON9: number;
	  EPSILON10: number;
	  EPSILON11: number;
	  EPSILON12: number;
	  EPSILON13: number;
	  EPSILON14: number;
	  EPSILON15: number;
	  EPSILON16: number;
	  EPSILON17: number;
	  EPSILON18: number;
	  EPSILON19: number;
	  EPSILON20: number;

	  PI_OVER_TWO: number;
	  PI_OVER_FOUR: number;
	  PI_OVER_SIX: number;

	  TWO_PI: number;
	};

	// DEPRECATED
	export {default as _SphericalCoordinates} from '@math.gl/core/src/classes/spherical-coordinates';
	export {default as _Pose} from '@math.gl/core/src/classes/pose';
	export {default as _Euler} from '@math.gl/core/src/classes/euler';

}
declare module '@math.gl/core/dist/es5/addons/polygon' {
	import {NumberArray} from '@math.gl/core/@math.gl/core/';

	type SegmentVisitor = (p1: NumberArray, p2: NumberArray, i1: number, i2: number) => void;

	export default class Polygon {
	  constructor(
	    points: NumberArray | NumberArray[],
	    options?: {start?: number; end?: number; size?: number; isClosed?: boolean}
	  );

	  // https://en.wikipedia.org/wiki/Shoelace_formula
	  getSignedArea(): number;
	  getArea(): number;
	  getWindingDirection(): number;
	  forEachSegment(visitor: SegmentVisitor): void;
	  modifyWindingDirection(direction: number): boolean;
	}

}
declare module '@math.gl/core/dist/es6/lib/common' {
	type TypedArray =
	  | Int8Array
	  | Uint8Array
	  | Int16Array
	  | Uint16Array
	  | Int32Array
	  | Uint32Array
	  | Uint8ClampedArray
	  | Float32Array
	  | Float64Array;

	type NumberArray = TypedArray | number[];

	type ConfigurationOptions = {
	  EPSILON?: number;
	  debug?: boolean;
	  precision?: number;
	  printTypes?: boolean;
	  printDegrees?: boolean;
	  printRowMajor?: boolean;
	  _cartographicRadians?: boolean;
	};

	export const config: ConfigurationOptions;

	export function configure(options?: ConfigurationOptions): ConfigurationOptions;

	export function formatValue(value: number, options?: ConfigurationOptions): string;

	/**
	 * Check if value is an "array"
	 * Returns `true` if value is either an array or a typed array
	 *
	 * Note: returns `false` for `ArrayBuffer` and `DataView` instances
	 */
	export function isArray(value: any): boolean;

	export function clone(array: number[]): number[];
	export function clone(array: TypedArray): TypedArray;

	export function toRadians(degrees: number): number;
	export function toRadians(degrees: number[]): number[];
	export function toRadians(degrees: TypedArray): TypedArray;
	export function toDegrees(radians: number): number;
	export function toDegrees(radians: number[]): number[];
	export function toDegrees(radians: TypedArray): TypedArray;

	// GLSL math function equivalents: Work on both single values and vectors

	/* eslint-disable no-shadow */

	export function radians(degrees, result?);
	export function degrees(radians, result?);

	/** "GLSL equivalent" of `Math.sin` Works on single values and vectors */
	export function sin(radians: number): number;
	export function sin(radians: number[]): number[];
	// "GLSL equivalent" of Math. : Works on single values and vectors
	export function cos(radians);
	/** "GLSL equivalent" of `Math.tan`: Works on single values and vectors */
	export function tan(radians);

	/** "GLSL equivalent" of `Math.asin`: Works on single values and vectors */
	export function asin(radians);
	/** "GLSL equivalent" of `Math.acos`: Works on single values and vectors */
	export function acos(radians);
	/** "GLSL equivalent" of `Math.atan`: Works on single values and vectors */
	export function atan(radians);

	/** GLSL style value clamping: Works on single values and vectors */
	export function clamp(value, min, max);

	// Interpolate between two numbers or two arrays
	export function lerp(a, b, t: number);

	export function equals(a, b, epsilon?: number);

	export function exactEquals(a, b);

	export function withEpsilon(epsilon: number, func: any): any;

}
declare module '@math.gl/core/dist/es6/classes/base/math-array' {
	
	/** Base class for vectors and matrices */
	export default class MathArray<DerivedType> extends Array<number> {
	  // Defined by derived class
	  ELEMENTS: number;
	  RANK: number;

	  clone(): DerivedType;

	  // TODO - define more sophisticated object type per class?
	  from(array: readonly number[]): DerivedType;
	  from(object: object): DerivedType;

	  fromArray(array: readonly number[], offset?: number): DerivedType;
	  // todo
	  to(arrayOrObject): any;
	  toTarget(target): any;

	  toArray(array?: number[], offset?: number): number[];
	  toFloat32Array(): Float32Array;
	  toString(): string;
	  formatString(opts: object): string;
	  equals(array: readonly number[]): boolean;
	  exactEquals(array: readonly number[]): boolean;

	  // Modifiers

	  negate(): DerivedType;
	  lerp(a: readonly number[], b: readonly number[], t: number): DerivedType;

	  min(vector: readonly number[]): DerivedType;
	  max(vector: readonly number[]): DerivedType;

	  clamp(minVector: readonly number[], maxVector: readonly number[]): DerivedType;

	  add(...vectors): DerivedType;
	  subtract(...vectors): DerivedType;

	  scale(scale): DerivedType;

	  // three.js compatibility

	  sub(a): DerivedType;
	  setScalar(a): DerivedType;
	  addScalar(a): DerivedType;
	  subScalar(a): DerivedType;
	  multiplyScalar(scalar): DerivedType;
	  divideScalar(a): DerivedType;
	  clampScalar(min, max): DerivedType;
	  elements: number[];

	  // Cesium compatibility
	  multiplyByScalar(scalar): DerivedType;

	  // private
	  check(): DerivedType;
	}

}
declare module '@math.gl/core/dist/es6/classes/base/vector' {
	import MathArray from '@math.gl/core/dist/es6/classes/base/math-array';

	/** Base class for vectors */
	export default class Vector<VectorType> extends MathArray<VectorType> {
	  // VIRTUAL METHODS
	  // copy(vector) {

	  // ACCESSORS

	  x: number;
	  y: number;

	  // NOTE: `length` is a reserved word for Arrays, so we can't use `v.length()`
	  len(): number;
	  magnitude(): number;
	  lengthSquared(): number;
	  magnitudeSquared(): number;

	  distance(mathArray): number;

	  distanceSquared(mathArray): number;

	  dot(mathArray): number;
	  // MODIFIERS

	  normalize(): VectorType;

	  multiply(...vectors): VectorType;

	  divide(...vectors): VectorType;

	  // THREE.js compatibility
	  lengthSq(): number;
	  distanceTo(vector: VectorType): number;
	  distanceToSquared(vector): number;

	  getComponent(i): number;
	  setComponent(i, value): number;

	  addVectors(a: VectorType, b: VectorType): VectorType;
	  subVectors(a: VectorType, b: VectorType): VectorType;
	  multiplyVectors(a: VectorType, b: VectorType): VectorType;

	  addScaledVector(a: VectorType, b: VectorType): VectorType;
	}

}
declare module '@math.gl/core/dist/es6/classes/vector2' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from '@math.gl/core/dist/es6/classes/base/vector';

	/* Two-element vector class */
	export default class Vector2 extends Vector<Vector2> {
	  static ZERO: number[];
	  // Getters/setters
	  ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number);

	  set(x: number, y: number): Vector2;

	  copy(array: readonly number[]): Vector2;

	  fromObject(object): Vector2;
	  //  {
	  //   if (config.debug) {
	  //     checkNumber(object.x);
	  //     checkNumber(object.y);
	  //   }
	  //   this[0] = object.x;
	  //   this[1] = object.y;
	  //   return this.check();
	  // }

	  toObject(object: object): object;

	  // x,y inherited from Vector

	  horizontalAngle(): number;

	  verticalAngle(): number;

	  // Transforms
	  transform(matrix4: readonly number[]): Vector2;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector2;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector2;

	  transformByMatrix3(matrix3: readonly number[]): Vector2;
	  transformByMatrix2x3(matrix2x3: readonly number[]): Vector2;
	  transformByMatrix2(matrix2: readonly number[]): Vector2;
	}

}
declare module '@math.gl/core/dist/es6/classes/vector3' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from '@math.gl/core/dist/es6/classes/base/vector';

	/** Three-element vector class */
	export default class Vector3 extends Vector<Vector3> {
	  static readonly ZERO: Vector3;
	  readonly ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number, z: number);

	  set(x: number, y: number, z: number);

	  copy(array: readonly number[]);

	  fromObject(object);
	  toObject(object);

	  // x,y inherited from Vector

	  z: number;

	  // ACCESSORS
	  angle(vector: readonly number[]): number;

	  // MODIFIERS
	  cross(vector: readonly number[]): Vector3;

	  rotateX(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateY(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateZ(args: {radians: number; origin?: readonly number[]}): Vector3;

	  // Transforms

	  // transforms as point (4th component is implicitly 1)
	  transform(matrix4: readonly number[]): Vector3;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector3;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector3;

	  transformByMatrix3(matrix3: readonly number[]): Vector3;
	  transformByMatrix2(matrix2: readonly number[]): Vector3;
	  transformByQuaternion(quaternion: readonly number[]): Vector3;
	}

}
declare module '@math.gl/core/dist/es6/classes/vector4' {
	import Vector from '@math.gl/core/dist/es6/classes/base/vector';

	/** Four-element vector class */
	export default class Vector4 extends Vector<Vector4> {
	  static ZERO: number[];

	  ELEMENTS: number;

	  /** construct a new Vector4 initialize to [0, 0, 0, 0] */
	  constructor();
	  /** construct a new Vector4 initialize to ...x, y, z, w */
	  constructor(x: number, y: number, z: number, w: number);
	  /** construct a new Vector4 initialize to array [x, y, z, w] */
	  constructor(array: readonly number[]);

	  set(x, y, z, w);

	  copy(array);

	  fromObject(object);

	  toObject(object);

	  // x,y inherited from Vector
	  z: number;
	  w: number;

	  transform(matrix4: readonly number[]): Vector4;
	  transformByMatrix3(matrix3: readonly number[]): Vector4;
	  transformByMatrix2(matrix2: readonly number[]): Vector4;
	  transformByQuaternion(quaternion: readonly number[]): Vector4;

	  // three.js compatibility
	  applyMatrix4(m: readonly number[]): Vector4;
	}

}
declare module '@math.gl/core/dist/es6/classes/base/matrix' {
	import MathArray from '@math.gl/core/dist/es6/classes/base/math-array';

	export default class Matrix<MatrixType> extends MathArray<MatrixType> {
	  toString(): string;

	  getElementIndex(row: number, col: number): number;
	  // By default assumes row major indices
	  getElement(row: number, col: number);
	  // By default assumes row major indices
	  setElement(row: number, col: number, value: number);
	  getColumn(columnIndex: number, result?: number[]);
	  setColumn(columnIndex: number, columnVector: number[]);
	}

}
declare module '@math.gl/core/dist/es6/classes/matrix3' {
	import Matrix from '@math.gl/core/dist/es6/classes/base/matrix';
	// import Quaternion from './quaternion';

	export default class Matrix3 extends Matrix<Matrix3> {
	  static IDENTITY: Matrix3;
	  static ZERO: Matrix3;

	  // inherited
	  // ELEMENTS: number;
	  // RANK: number;
	  INDICES: number[];

	  constructor();
	  constructor(array: number[]);
	  constructor(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  copy(array): Matrix3;

	  // accepts column major order, stores in column major order
	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  // accepts row major order, stores as column major
	  // eslint-disable-next-line max-params
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m20: number,
	    m21: number,
	    m22: number
	  );
	  setRowMajor(...array: number[]);

	  // Accessors
	  determinant(): number;

	  // Constructors
	  identity(): Matrix3;

	  // Calculates a 3x3 matrix from the given quaternion
	  // q quat  Quaternion to create matrix from
	  fromQuaternion(q: number[]): Matrix3;

	  // Modifiers
	  transpose(): Matrix3;
	  invert(): Matrix3;

	  // Operations
	  multiplyLeft(a: Matrix3): Matrix3;
	  multiplyRight(a: Matrix3): Matrix3;

	  rotate(radians: number): Matrix3;

	  scale(scale: number): Matrix3;
	  scale([scaleX, scaleY, scaleZ]: number[]): Matrix3;

	  translate(vec): Matrix3;

	  // Transforms

	  transform(vector: number[], result?: number[]): number[];

	  // DEPRECATED IN 3.0
	  transformVector(vector, result);
	  transformVector2(vector, result);
	  transformVector3(vector, result);
	}

}
declare module '@math.gl/core/dist/es6/classes/matrix4' {
	import Matrix from '@math.gl/core/dist/es6/classes/base/matrix';
	// import Quaternion from './quaternion';

	type Array16 = number[];
	// = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

	export default class Matrix4 extends Matrix<Matrix4> {
	  static IDENTITY: number[];
	  static ZERO: number[];
	  INDICES: number[];
	  // get ELEMENTS()
	  // get RANK()

	  constructor();
	  constructor(array: Array16);

	  copy(array: Array16);

	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );

	  toRowMajor(result: Array16);

	  identity(): Matrix4;

	  // Calculates a 4x4 matrix from the given quaternion
	  fromQuaternion(q: number[]): Matrix4;

	  // Generates a frustum matrix with the given bounds
	  frustum(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates a look-at matrix with the given eye position, focal point, and up axis
	  lookAt(eye: number[], center: number[], up: number[]): Matrix4;
	  lookAt(args: {eye: number[]; center?: number[]; up: number[]}): Matrix4;

	  // Generates a orthogonal projection matrix with the given bounds
	  ortho(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates an orthogonal projection matrix with the same parameters
	  orthographic(args: {
	    fovy: number;
	    aspect?: number;
	    focalDistance?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Generates a perspective projection matrix with the given bounds
	  perspective(args: {
	    fovy?: number;
	    fov?: number;
	    aspect?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Accessors

	  determinant(): Matrix4;

	  // Decomposition
	  // Extracts the non-uniform scale assuming the matrix is an affine transformation.
	  // The scales are the "lengths" of the column vectors in the upper-left 3x3 matrix.
	  getScale(result?: number[]): Matrix4;
	  // Gets the translation portion, assuming the matrix is a affine transformation matrix.
	  getTranslation(result?: number[]): Matrix4;
	  // Gets upper left 3x3 pure rotation matrix (non-scaling), assume affine transformation matrix
	  getRotation(result?: number[], scaleResult?: number[]);
	  getRotationMatrix3(result?: number[], scaleResult?: number[]);

	  // Modifiers
	  transpose(): Matrix4;
	  invert(): Matrix4;

	  // Operations
	  multiplyLeft(a: number[]): Matrix4;
	  multiplyRight(a: number[]): Matrix4;

	  scale(factor): Matrix4;
	  translate(vec): Matrix4;
	  rotateX(radians: number): Matrix4;
	  rotateY(radians: number): Matrix4;
	  rotateZ(radians: number): Matrix4;
	  rotateXYZ([rx, ry, rz]: number[]): Matrix4;
	  rotateAxis(radians, axis): Matrix4;

	  // Transforms

	  // Transforms any 2, 3 or 4 element vector. 2 and 3 elements are treated as points
	  transform(vector: number[], result: number[]): number[];

	  // Transforms any 2 or 3 element array as point (w implicitly 1)
	  transformAsPoint(vector: number[], result: number[]): number[];
	  transformAsVector(vector: number[], result: number[]): number[];

	  // three.js math API compatibility
	  makeRotationX(radians: number): Matrix4;
	  makeTranslation(x: number, y: number, z: number): Matrix4;

	  // DEPRECATED in 3.0
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformPoint(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformVector(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformDirection(vector: number[], result?: number[]): number[];
	}

}
declare module '@math.gl/core/dist/es6/classes/quaternion' {
	import MathArray from '@math.gl/core/dist/es6/classes/base/math-array';

	export default class Quaternion extends MathArray<Quaternion> {
	  // Getters/setters
	  ELEMENTS: number;

	  x: number;
	  y: number;
	  z: number;
	  w: number;

	  /** Creates a new identity quaternion: `w^2 + x^2 + y^2 + z^2 = 1` */
	  constructor();
	  constructor(q: Quaternion);
	  constructor(q: readonly number[]);
	  constructor(x: number, y: number, z: number, w: number);

	  copy(array: readonly number[]): Quaternion;

	  set(x: number, y: number, z: number, w: number): Quaternion;

	  /**
	   * Creates a quaternion from the given 3x3 rotation matrix.
	   *
	   * - The resultant quaternion is not normalized, so you should
	   * be sure to renormalize the quaternion yourself where necessary.
	   */
	  fromMatrix3(m: readonly number[]): Quaternion;

	  fromAxisRotation(axis, rad): Quaternion;

	  /** Set a quat to the identity quaternion */
	  identity(): Quaternion;

	  // Set the components of a quaternion to the given values
	  // set(i, j, k, l) {
	  //   quat.set(this, i, j, k, l);
	  //   return this.check();
	  // }

	  /** Sets a quaternion from the given angle and rotation axis, then returns it. */
	  setAxisAngle(axis, rad): Quaternion;

	  /** Calculates the length of a quaternion */
	  len(): number;

	  /** Calculates the squared length of a quaternion */
	  lengthSquared(): number;

	  /** Calculates the dot product of two quaternions */
	  dot(a: readonly number[]): number;

	  rotationTo(vectorA, vectorB): Quaternion;

	  /** Adds two quaternions */
	  add(a: readonly number[]): Quaternion;

	  /**
	   * Calculates the W component of a quat from the X, Y, and Z components.
	   * Any existing W component will be ignored.
	   */
	  calculateW(): Quaternion;

	  /**
	   * Calculates the conjugate of a quat If the quaternion is normalized,
	   * this function is faster than quat.inverse and produces the same result.
	   */
	  conjugate(): Quaternion;

	  /** Calculates the inverse of this quaternion */
	  invert(): Quaternion;

	  /** Performs a linear interpolation between two quaternions */
	  lerp(a, b, t): Quaternion;

	  /** Multiplies two quaternions */
	  multiplyRight(a, b): Quaternion;
	  /** Multiplies two quaternions */
	  multiplyLeft(a, b): Quaternion;

	  /** Normalize a quaternion */
	  normalize(): Quaternion;

	  // MODIFIERS

	  /** Rotates a quaternion by the given angle about the X axis */
	  rotateX(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Y axis */
	  rotateY(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Z axis */
	  rotateZ(radians: number): Quaternion;

	  /** Scales a quaternion by a scalar number */
	  scale(b: number): Quaternion;

	  /** Performs a spherical linear interpolation between two quaternions */
	  slerp(start: readonly number[], target: readonly number[], ratio: number): Quaternion;
	  slerp(args: {start: readonly number[]; target: readonly number[]; ratio: number}): Quaternion;

	  transformVector4(vector, result?);

	  // THREE.js Math API compatibility
	  lengthSq(): Quaternion;
	  setFromAxisAngle(axis, rad): Quaternion;
	  premultiply(a, b): Quaternion;
	  multiply(a, b): Quaternion;
	}

}
declare module '@math.gl/core/dist/es6/classes/spherical-coordinates' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	// Adaptation of THREE.js Spherical class, under MIT license
	import Vector3 from '@math.gl/core/dist/es6/classes/vector3';

	type SphericalCoordinatesOptions = {
	  phi?: number;
	  theta?: number;
	  radius?: number;
	  bearing?: number;
	  pitch?: number;
	  altitude?: number;
	  radiusScale?: number;
	};

	type FormatOptions = {
	  printTypes?: boolean;
	};

	/**
	 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
	 * The poles (phi) are at the positive and negative y axis.
	 * The equator starts at positive z.
	 */
	export default class SphericalCoordinates {
	  // Todo [rho, theta, phi] ?

	  // Cartographic (bearing 0 north, pitch 0 look from above)
	  bearing: number;
	  pitch: number;
	  altitude: number;

	  // lnglatZ coordinates
	  longitude: number;
	  latitude: number;
	  lng: number;
	  lat: number;
	  z: number;

	  /**
	   * @param {Object} options
	   * @param {Number} [options.phi] =0 - rotation around X (latitude)
	   * @param {Number} [options.theta] =0 - rotation around Y (longitude)
	   * @param {Number} [options.radius] =1 - Distance from center
	   * @param {Number} [options.bearing]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.altitude]
	   * @param {Number} [options.radiusScale] =1
	   */
	  constructor(options?: SphericalCoordinatesOptions);

	  fromLngLatZ(lngLatZ: number[]): SphericalCoordinates;
	  fromVector3(v: number[]): SphericalCoordinates;

	  clone(): SphericalCoordinates;
	  copy(other: SphericalCoordinates): SphericalCoordinates;
	  set(radius: number, phi: number, theta: number): SphericalCoordinates;

	  equals(other: SphericalCoordinates): boolean;
	  exactEquals(other: SphericalCoordinates): boolean;

	  toString(): string;
	  formatString(options?: FormatOptions): string;
	  toVector3(): Vector3;

	  // restrict phi to be betwee EPS and PI-EPS
	  makeSafe(): SphericalCoordinates;
	  check(): SphericalCoordinates;
	}

}
declare module '@math.gl/core/dist/es6/classes/euler' {
	import MathArray from '@math.gl/core/dist/es6/classes/base/math-array';
	import Quaternion from '@math.gl/core/dist/es6/classes/quaternion';
	import Matrix3 from '@math.gl/core/dist/es6/classes/matrix3';

	export default class Euler extends MathArray<Euler> {
	  static ZYX: number;
	  static YXZ: number;
	  static XZY: number;
	  static ZXY: number;
	  static YZX: number;
	  static XYZ: number;
	  static RollPitchYaw: number;
	  static DefaultOrder: number;
	  static RotationOrders: string[];

	  static rotationOrder(order: number): string;

	  ELEMENTS: number;

	  /**
	   * @class
	   * @param {Number | Number[]} x
	   * @param {Number=} [y]
	   * @param {Number=} [z]
	   * @param {Number=} [order]
	   */
	  constructor();
	  constructor(x: number, y: number, z: number, order?: number);
	  constructor(vector3: number[], order?: number);

	  fromQuaternion(quaternion: Quaternion): Euler;

	  // If copied array does contain fourth element, preserves currently set order
	  copy(array: number[]): Euler;

	  // Sets the three angles, and optionally sets the rotation order
	  // If order is not specified, preserves currently set order
	  set(x: number, y: number, z: number, order?: number): Euler;

	  validate(): boolean;

	  // Does not copy the orientation element
	  toArray(array?: number[], offset?: number): number[];

	  // Copies the orientation element
	  toArray4(array?: number[], offset?: number): number[];

	  toVector3(result?: number[]): number[];

	  // x, y, z angle notation (note: only corresponds to axis in XYZ orientation)
	  x: number;
	  y: number;
	  z: number;

	  // alpha, beta, gamma angle notation
	  alpha: number;
	  beta: number;
	  gamma: number;

	  // phi, theta, psi angle notation
	  phi: number;
	  theta: number;
	  psi: number;

	  // roll, pitch, yaw angle notation
	  roll: number;
	  pitch: number;
	  yaw: number;

	  // rotation order, in all three angle notations
	  order: number;

	  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */

	  // Constructors
	  fromVector3(v: number[], order: number): Euler;
	  // TODO - with and without 4th element
	  fromArray(array: number[], offset?: number): Euler;

	  // Common ZYX rotation order
	  fromRollPitchYaw(roll: number, pitch: number, yaw: number): Euler;
	  fromRotationMatrix(m: number[], order?: number): Euler;

	  // ACCESSORS

	  getRotationMatrix(m: Matrix3): Matrix3;
	  getRotationMatrix(m?: number[]): number[];

	  // TODO - move to Quaternion
	  getQuaternion(): Quaternion;
	  toQuaternion(): Quaternion;
	}

}
declare module '@math.gl/core/dist/es6/classes/pose' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.
	import Matrix4 from '@math.gl/core/dist/es6/classes/matrix4';
	import Vector3 from '@math.gl/core/dist/es6/classes/vector3';
	import Euler from '@math.gl/core/dist/es6/classes/euler';

	type PoseOptions = {
	  position?: number[];
	  orientation?: number[];
	  x?: number;
	  y?: number;
	  z?: number;
	  roll?: number;
	  pitch?: number;
	  yaw?: number;
	};

	export default class Pose {
	  /**
	   * A pose contains both rotation and rotations.
	   * Note that every single pose defines its own coordinate system
	   * (with the position of the pose in the origin, and zero rotations).
	   * These "pose relative" coordinate will be centered on the defining
	   * pose's position and with with the defining pose's orientation
	   * aligned with axis.
	   * @param {Object} options
	   * @param {Number[]} [options.position]
	   * @param {Number[]} [options.orientation]
	   * @param {Number} [options.x]
	   * @param {Number} [options.y]
	   * @param {Number} [options.z]
	   * @param {Number} [options.roll]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.yaw]
	   */
	  constructor(options?: PoseOptions);

	  x: number;
	  y: number;
	  z: number;
	  roll: number;
	  pitch: number;
	  yaw: number;

	  getPosition(): Vector3;
	  getOrientation(): Euler;

	  equals(pose: Pose): boolean;
	  exactEquals(pose: Pose): boolean;

	  /**
	   * Returns a 4x4 matrix that transforms a coordinates (in the same
	   * coordinate system as this pose) into the "pose-relative" coordinate
	   * system defined by this pose.
	   * The pose relative coordinates with have origin in the position of this
	   * pose, and axis will be aligned with the rotation of this pose.
	   */
	  getTransformationMatrix(): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * second coordinate system into the coordinate system of this pose.
	   */
	  getTransformationMatrixFromPose(pose: Pose): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * coordinate system of this pose into the coordinate system of the second pose.
	   *
	   * Note: This method returns the inverse of `this.getTransformationMatrixFromPose(pose)`
	   */
	  getTransformationMatrixToPose(pose: Pose): Matrix4;
	}

}
declare module 'dist/es6' {
	// lib
	export * from '@math.gl/core/dist/es6/lib/common';

	// classes
	export {default as Vector2} from '@math.gl/core/dist/es6/classes/vector2';
	export {default as Vector3} from '@math.gl/core/dist/es6/classes/vector3';
	export {default as Vector4} from '@math.gl/core/dist/es6/classes/vector4';
	export {default as Matrix3} from '@math.gl/core/dist/es6/classes/matrix3';
	export {default as Matrix4} from '@math.gl/core/dist/es6/classes/matrix4';
	export {default as Quaternion} from '@math.gl/core/dist/es6/classes/quaternion';

	// extras

	// export {checkNumber} from './lib/validators';
	export function assert(condition: boolean, message?: string): void;

	// experimental
	export {default as SphericalCoordinates} from '@math.gl/core/dist/es6/classes/spherical-coordinates';
	export {default as Pose} from '@math.gl/core/dist/es6/classes/pose';
	export {default as Euler} from '@math.gl/core/dist/es6/classes/euler';

	export const _MathUtils: {
	  EPSILON1: number;
	  EPSILON2: number;
	  EPSILON3: number;
	  EPSILON4: number;
	  EPSILON5: number;
	  EPSILON6: number;
	  EPSILON7: number;
	  EPSILON8: number;
	  EPSILON9: number;
	  EPSILON10: number;
	  EPSILON11: number;
	  EPSILON12: number;
	  EPSILON13: number;
	  EPSILON14: number;
	  EPSILON15: number;
	  EPSILON16: number;
	  EPSILON17: number;
	  EPSILON18: number;
	  EPSILON19: number;
	  EPSILON20: number;

	  PI_OVER_TWO: number;
	  PI_OVER_FOUR: number;
	  PI_OVER_SIX: number;

	  TWO_PI: number;
	};

	// DEPRECATED
	export {default as _SphericalCoordinates} from '@math.gl/core/dist/es6/classes/spherical-coordinates';
	export {default as _Pose} from '@math.gl/core/dist/es6/classes/pose';
	export {default as _Euler} from '@math.gl/core/dist/es6/classes/euler';

}
declare module '@math.gl/core/dist/es6/addons/polygon' {
	import {NumberArray} from '@math.gl/core/@math.gl/core/';

	type SegmentVisitor = (p1: NumberArray, p2: NumberArray, i1: number, i2: number) => void;

	export default class Polygon {
	  constructor(
	    points: NumberArray | NumberArray[],
	    options?: {start?: number; end?: number; size?: number; isClosed?: boolean}
	  );

	  // https://en.wikipedia.org/wiki/Shoelace_formula
	  getSignedArea(): number;
	  getArea(): number;
	  getWindingDirection(): number;
	  forEachSegment(visitor: SegmentVisitor): void;
	  modifyWindingDirection(direction: number): boolean;
	}

}
declare module '@math.gl/core/dist/esm/lib/common' {
	type TypedArray =
	  | Int8Array
	  | Uint8Array
	  | Int16Array
	  | Uint16Array
	  | Int32Array
	  | Uint32Array
	  | Uint8ClampedArray
	  | Float32Array
	  | Float64Array;

	type NumberArray = TypedArray | number[];

	type ConfigurationOptions = {
	  EPSILON?: number;
	  debug?: boolean;
	  precision?: number;
	  printTypes?: boolean;
	  printDegrees?: boolean;
	  printRowMajor?: boolean;
	  _cartographicRadians?: boolean;
	};

	export const config: ConfigurationOptions;

	export function configure(options?: ConfigurationOptions): ConfigurationOptions;

	export function formatValue(value: number, options?: ConfigurationOptions): string;

	/**
	 * Check if value is an "array"
	 * Returns `true` if value is either an array or a typed array
	 *
	 * Note: returns `false` for `ArrayBuffer` and `DataView` instances
	 */
	export function isArray(value: any): boolean;

	export function clone(array: number[]): number[];
	export function clone(array: TypedArray): TypedArray;

	export function toRadians(degrees: number): number;
	export function toRadians(degrees: number[]): number[];
	export function toRadians(degrees: TypedArray): TypedArray;
	export function toDegrees(radians: number): number;
	export function toDegrees(radians: number[]): number[];
	export function toDegrees(radians: TypedArray): TypedArray;

	// GLSL math function equivalents: Work on both single values and vectors

	/* eslint-disable no-shadow */

	export function radians(degrees, result?);
	export function degrees(radians, result?);

	/** "GLSL equivalent" of `Math.sin` Works on single values and vectors */
	export function sin(radians: number): number;
	export function sin(radians: number[]): number[];
	// "GLSL equivalent" of Math. : Works on single values and vectors
	export function cos(radians);
	/** "GLSL equivalent" of `Math.tan`: Works on single values and vectors */
	export function tan(radians);

	/** "GLSL equivalent" of `Math.asin`: Works on single values and vectors */
	export function asin(radians);
	/** "GLSL equivalent" of `Math.acos`: Works on single values and vectors */
	export function acos(radians);
	/** "GLSL equivalent" of `Math.atan`: Works on single values and vectors */
	export function atan(radians);

	/** GLSL style value clamping: Works on single values and vectors */
	export function clamp(value, min, max);

	// Interpolate between two numbers or two arrays
	export function lerp(a, b, t: number);

	export function equals(a, b, epsilon?: number);

	export function exactEquals(a, b);

	export function withEpsilon(epsilon: number, func: any): any;

}
declare module '@math.gl/core/dist/esm/classes/base/math-array' {
	
	/** Base class for vectors and matrices */
	export default class MathArray<DerivedType> extends Array<number> {
	  // Defined by derived class
	  ELEMENTS: number;
	  RANK: number;

	  clone(): DerivedType;

	  // TODO - define more sophisticated object type per class?
	  from(array: readonly number[]): DerivedType;
	  from(object: object): DerivedType;

	  fromArray(array: readonly number[], offset?: number): DerivedType;
	  // todo
	  to(arrayOrObject): any;
	  toTarget(target): any;

	  toArray(array?: number[], offset?: number): number[];
	  toFloat32Array(): Float32Array;
	  toString(): string;
	  formatString(opts: object): string;
	  equals(array: readonly number[]): boolean;
	  exactEquals(array: readonly number[]): boolean;

	  // Modifiers

	  negate(): DerivedType;
	  lerp(a: readonly number[], b: readonly number[], t: number): DerivedType;

	  min(vector: readonly number[]): DerivedType;
	  max(vector: readonly number[]): DerivedType;

	  clamp(minVector: readonly number[], maxVector: readonly number[]): DerivedType;

	  add(...vectors): DerivedType;
	  subtract(...vectors): DerivedType;

	  scale(scale): DerivedType;

	  // three.js compatibility

	  sub(a): DerivedType;
	  setScalar(a): DerivedType;
	  addScalar(a): DerivedType;
	  subScalar(a): DerivedType;
	  multiplyScalar(scalar): DerivedType;
	  divideScalar(a): DerivedType;
	  clampScalar(min, max): DerivedType;
	  elements: number[];

	  // Cesium compatibility
	  multiplyByScalar(scalar): DerivedType;

	  // private
	  check(): DerivedType;
	}

}
declare module '@math.gl/core/dist/esm/classes/base/vector' {
	import MathArray from '@math.gl/core/dist/esm/classes/base/math-array';

	/** Base class for vectors */
	export default class Vector<VectorType> extends MathArray<VectorType> {
	  // VIRTUAL METHODS
	  // copy(vector) {

	  // ACCESSORS

	  x: number;
	  y: number;

	  // NOTE: `length` is a reserved word for Arrays, so we can't use `v.length()`
	  len(): number;
	  magnitude(): number;
	  lengthSquared(): number;
	  magnitudeSquared(): number;

	  distance(mathArray): number;

	  distanceSquared(mathArray): number;

	  dot(mathArray): number;
	  // MODIFIERS

	  normalize(): VectorType;

	  multiply(...vectors): VectorType;

	  divide(...vectors): VectorType;

	  // THREE.js compatibility
	  lengthSq(): number;
	  distanceTo(vector: VectorType): number;
	  distanceToSquared(vector): number;

	  getComponent(i): number;
	  setComponent(i, value): number;

	  addVectors(a: VectorType, b: VectorType): VectorType;
	  subVectors(a: VectorType, b: VectorType): VectorType;
	  multiplyVectors(a: VectorType, b: VectorType): VectorType;

	  addScaledVector(a: VectorType, b: VectorType): VectorType;
	}

}
declare module '@math.gl/core/dist/esm/classes/vector2' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from '@math.gl/core/dist/esm/classes/base/vector';

	/* Two-element vector class */
	export default class Vector2 extends Vector<Vector2> {
	  static ZERO: number[];
	  // Getters/setters
	  ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number);

	  set(x: number, y: number): Vector2;

	  copy(array: readonly number[]): Vector2;

	  fromObject(object): Vector2;
	  //  {
	  //   if (config.debug) {
	  //     checkNumber(object.x);
	  //     checkNumber(object.y);
	  //   }
	  //   this[0] = object.x;
	  //   this[1] = object.y;
	  //   return this.check();
	  // }

	  toObject(object: object): object;

	  // x,y inherited from Vector

	  horizontalAngle(): number;

	  verticalAngle(): number;

	  // Transforms
	  transform(matrix4: readonly number[]): Vector2;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector2;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector2;

	  transformByMatrix3(matrix3: readonly number[]): Vector2;
	  transformByMatrix2x3(matrix2x3: readonly number[]): Vector2;
	  transformByMatrix2(matrix2: readonly number[]): Vector2;
	}

}
declare module '@math.gl/core/dist/esm/classes/vector3' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	import Vector from '@math.gl/core/dist/esm/classes/base/vector';

	/** Three-element vector class */
	export default class Vector3 extends Vector<Vector3> {
	  static readonly ZERO: Vector3;
	  readonly ELEMENTS: number;

	  constructor();
	  constructor(array: readonly number[]);
	  constructor(x: number, y: number, z: number);

	  set(x: number, y: number, z: number);

	  copy(array: readonly number[]);

	  fromObject(object);
	  toObject(object);

	  // x,y inherited from Vector

	  z: number;

	  // ACCESSORS
	  angle(vector: readonly number[]): number;

	  // MODIFIERS
	  cross(vector: readonly number[]): Vector3;

	  rotateX(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateY(args: {radians: number; origin?: readonly number[]}): Vector3;
	  rotateZ(args: {radians: number; origin?: readonly number[]}): Vector3;

	  // Transforms

	  // transforms as point (4th component is implicitly 1)
	  transform(matrix4: readonly number[]): Vector3;
	  // transforms as point (4th component is implicitly 1)
	  transformAsPoint(matrix4: readonly number[]): Vector3;
	  // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
	  transformAsVector(matrix4: readonly number[]): Vector3;

	  transformByMatrix3(matrix3: readonly number[]): Vector3;
	  transformByMatrix2(matrix2: readonly number[]): Vector3;
	  transformByQuaternion(quaternion: readonly number[]): Vector3;
	}

}
declare module '@math.gl/core/dist/esm/classes/vector4' {
	import Vector from '@math.gl/core/dist/esm/classes/base/vector';

	/** Four-element vector class */
	export default class Vector4 extends Vector<Vector4> {
	  static ZERO: number[];

	  ELEMENTS: number;

	  /** construct a new Vector4 initialize to [0, 0, 0, 0] */
	  constructor();
	  /** construct a new Vector4 initialize to ...x, y, z, w */
	  constructor(x: number, y: number, z: number, w: number);
	  /** construct a new Vector4 initialize to array [x, y, z, w] */
	  constructor(array: readonly number[]);

	  set(x, y, z, w);

	  copy(array);

	  fromObject(object);

	  toObject(object);

	  // x,y inherited from Vector
	  z: number;
	  w: number;

	  transform(matrix4: readonly number[]): Vector4;
	  transformByMatrix3(matrix3: readonly number[]): Vector4;
	  transformByMatrix2(matrix2: readonly number[]): Vector4;
	  transformByQuaternion(quaternion: readonly number[]): Vector4;

	  // three.js compatibility
	  applyMatrix4(m: readonly number[]): Vector4;
	}

}
declare module '@math.gl/core/dist/esm/classes/base/matrix' {
	import MathArray from '@math.gl/core/dist/esm/classes/base/math-array';

	export default class Matrix<MatrixType> extends MathArray<MatrixType> {
	  toString(): string;

	  getElementIndex(row: number, col: number): number;
	  // By default assumes row major indices
	  getElement(row: number, col: number);
	  // By default assumes row major indices
	  setElement(row: number, col: number, value: number);
	  getColumn(columnIndex: number, result?: number[]);
	  setColumn(columnIndex: number, columnVector: number[]);
	}

}
declare module '@math.gl/core/dist/esm/classes/matrix3' {
	import Matrix from '@math.gl/core/dist/esm/classes/base/matrix';
	// import Quaternion from './quaternion';

	export default class Matrix3 extends Matrix<Matrix3> {
	  static IDENTITY: Matrix3;
	  static ZERO: Matrix3;

	  // inherited
	  // ELEMENTS: number;
	  // RANK: number;
	  INDICES: number[];

	  constructor();
	  constructor(array: number[]);
	  constructor(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  copy(array): Matrix3;

	  // accepts column major order, stores in column major order
	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m10: number,
	    m20: number,
	    m01: number,
	    m11: number,
	    m21: number,
	    m02: number,
	    m12: number,
	    m22: number
	  );

	  // accepts row major order, stores as column major
	  // eslint-disable-next-line max-params
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m20: number,
	    m21: number,
	    m22: number
	  );
	  setRowMajor(...array: number[]);

	  // Accessors
	  determinant(): number;

	  // Constructors
	  identity(): Matrix3;

	  // Calculates a 3x3 matrix from the given quaternion
	  // q quat  Quaternion to create matrix from
	  fromQuaternion(q: number[]): Matrix3;

	  // Modifiers
	  transpose(): Matrix3;
	  invert(): Matrix3;

	  // Operations
	  multiplyLeft(a: Matrix3): Matrix3;
	  multiplyRight(a: Matrix3): Matrix3;

	  rotate(radians: number): Matrix3;

	  scale(scale: number): Matrix3;
	  scale([scaleX, scaleY, scaleZ]: number[]): Matrix3;

	  translate(vec): Matrix3;

	  // Transforms

	  transform(vector: number[], result?: number[]): number[];

	  // DEPRECATED IN 3.0
	  transformVector(vector, result);
	  transformVector2(vector, result);
	  transformVector3(vector, result);
	}

}
declare module '@math.gl/core/dist/esm/classes/matrix4' {
	import Matrix from '@math.gl/core/dist/esm/classes/base/matrix';
	// import Quaternion from './quaternion';

	type Array16 = number[];
	// = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

	export default class Matrix4 extends Matrix<Matrix4> {
	  static IDENTITY: number[];
	  static ZERO: number[];
	  INDICES: number[];
	  // get ELEMENTS()
	  // get RANK()

	  constructor();
	  constructor(array: Array16);

	  copy(array: Array16);

	  // eslint-disable-next-line max-params
	  set(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );
	  setRowMajor(
	    m00: number,
	    m01: number,
	    m02: number,
	    m03: number,
	    m10: number,
	    m11: number,
	    m12: number,
	    m13: number,
	    m20: number,
	    m21: number,
	    m22: number,
	    m23: number,
	    m30: number,
	    m31: number,
	    m32: number,
	    m33: number
	  );

	  toRowMajor(result: Array16);

	  identity(): Matrix4;

	  // Calculates a 4x4 matrix from the given quaternion
	  fromQuaternion(q: number[]): Matrix4;

	  // Generates a frustum matrix with the given bounds
	  frustum(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates a look-at matrix with the given eye position, focal point, and up axis
	  lookAt(eye: number[], center: number[], up: number[]): Matrix4;
	  lookAt(args: {eye: number[]; center?: number[]; up: number[]}): Matrix4;

	  // Generates a orthogonal projection matrix with the given bounds
	  ortho(args: {
	    left: number;
	    right: number;
	    bottom: number;
	    top: number;
	    near: number;
	    far: number;
	  }): Matrix4;

	  // Generates an orthogonal projection matrix with the same parameters
	  orthographic(args: {
	    fovy: number;
	    aspect?: number;
	    focalDistance?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Generates a perspective projection matrix with the given bounds
	  perspective(args: {
	    fovy?: number;
	    fov?: number;
	    aspect?: number;
	    near?: number;
	    far?: number;
	  }): Matrix4;

	  // Accessors

	  determinant(): Matrix4;

	  // Decomposition
	  // Extracts the non-uniform scale assuming the matrix is an affine transformation.
	  // The scales are the "lengths" of the column vectors in the upper-left 3x3 matrix.
	  getScale(result?: number[]): Matrix4;
	  // Gets the translation portion, assuming the matrix is a affine transformation matrix.
	  getTranslation(result?: number[]): Matrix4;
	  // Gets upper left 3x3 pure rotation matrix (non-scaling), assume affine transformation matrix
	  getRotation(result?: number[], scaleResult?: number[]);
	  getRotationMatrix3(result?: number[], scaleResult?: number[]);

	  // Modifiers
	  transpose(): Matrix4;
	  invert(): Matrix4;

	  // Operations
	  multiplyLeft(a: number[]): Matrix4;
	  multiplyRight(a: number[]): Matrix4;

	  scale(factor): Matrix4;
	  translate(vec): Matrix4;
	  rotateX(radians: number): Matrix4;
	  rotateY(radians: number): Matrix4;
	  rotateZ(radians: number): Matrix4;
	  rotateXYZ([rx, ry, rz]: number[]): Matrix4;
	  rotateAxis(radians, axis): Matrix4;

	  // Transforms

	  // Transforms any 2, 3 or 4 element vector. 2 and 3 elements are treated as points
	  transform(vector: number[], result: number[]): number[];

	  // Transforms any 2 or 3 element array as point (w implicitly 1)
	  transformAsPoint(vector: number[], result: number[]): number[];
	  transformAsVector(vector: number[], result: number[]): number[];

	  // three.js math API compatibility
	  makeRotationX(radians: number): Matrix4;
	  makeTranslation(x: number, y: number, z: number): Matrix4;

	  // DEPRECATED in 3.0
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformPoint(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformVector(vector: number[], result?: number[]): number[];
	  /** @deprecated Use Matrix4.transformAsPoint instead. */
	  transformDirection(vector: number[], result?: number[]): number[];
	}

}
declare module '@math.gl/core/dist/esm/classes/quaternion' {
	import MathArray from '@math.gl/core/dist/esm/classes/base/math-array';

	export default class Quaternion extends MathArray<Quaternion> {
	  // Getters/setters
	  ELEMENTS: number;

	  x: number;
	  y: number;
	  z: number;
	  w: number;

	  /** Creates a new identity quaternion: `w^2 + x^2 + y^2 + z^2 = 1` */
	  constructor();
	  constructor(q: Quaternion);
	  constructor(q: readonly number[]);
	  constructor(x: number, y: number, z: number, w: number);

	  copy(array: readonly number[]): Quaternion;

	  set(x: number, y: number, z: number, w: number): Quaternion;

	  /**
	   * Creates a quaternion from the given 3x3 rotation matrix.
	   *
	   * - The resultant quaternion is not normalized, so you should
	   * be sure to renormalize the quaternion yourself where necessary.
	   */
	  fromMatrix3(m: readonly number[]): Quaternion;

	  fromAxisRotation(axis, rad): Quaternion;

	  /** Set a quat to the identity quaternion */
	  identity(): Quaternion;

	  // Set the components of a quaternion to the given values
	  // set(i, j, k, l) {
	  //   quat.set(this, i, j, k, l);
	  //   return this.check();
	  // }

	  /** Sets a quaternion from the given angle and rotation axis, then returns it. */
	  setAxisAngle(axis, rad): Quaternion;

	  /** Calculates the length of a quaternion */
	  len(): number;

	  /** Calculates the squared length of a quaternion */
	  lengthSquared(): number;

	  /** Calculates the dot product of two quaternions */
	  dot(a: readonly number[]): number;

	  rotationTo(vectorA, vectorB): Quaternion;

	  /** Adds two quaternions */
	  add(a: readonly number[]): Quaternion;

	  /**
	   * Calculates the W component of a quat from the X, Y, and Z components.
	   * Any existing W component will be ignored.
	   */
	  calculateW(): Quaternion;

	  /**
	   * Calculates the conjugate of a quat If the quaternion is normalized,
	   * this function is faster than quat.inverse and produces the same result.
	   */
	  conjugate(): Quaternion;

	  /** Calculates the inverse of this quaternion */
	  invert(): Quaternion;

	  /** Performs a linear interpolation between two quaternions */
	  lerp(a, b, t): Quaternion;

	  /** Multiplies two quaternions */
	  multiplyRight(a, b): Quaternion;
	  /** Multiplies two quaternions */
	  multiplyLeft(a, b): Quaternion;

	  /** Normalize a quaternion */
	  normalize(): Quaternion;

	  // MODIFIERS

	  /** Rotates a quaternion by the given angle about the X axis */
	  rotateX(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Y axis */
	  rotateY(radians: number): Quaternion;
	  /** Rotates a quaternion by the given angle about the Z axis */
	  rotateZ(radians: number): Quaternion;

	  /** Scales a quaternion by a scalar number */
	  scale(b: number): Quaternion;

	  /** Performs a spherical linear interpolation between two quaternions */
	  slerp(start: readonly number[], target: readonly number[], ratio: number): Quaternion;
	  slerp(args: {start: readonly number[]; target: readonly number[]; ratio: number}): Quaternion;

	  transformVector4(vector, result?);

	  // THREE.js Math API compatibility
	  lengthSq(): Quaternion;
	  setFromAxisAngle(axis, rad): Quaternion;
	  premultiply(a, b): Quaternion;
	  multiply(a, b): Quaternion;
	}

}
declare module '@math.gl/core/dist/esm/classes/spherical-coordinates' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	// Adaptation of THREE.js Spherical class, under MIT license
	import Vector3 from '@math.gl/core/dist/esm/classes/vector3';

	type SphericalCoordinatesOptions = {
	  phi?: number;
	  theta?: number;
	  radius?: number;
	  bearing?: number;
	  pitch?: number;
	  altitude?: number;
	  radiusScale?: number;
	};

	type FormatOptions = {
	  printTypes?: boolean;
	};

	/**
	 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
	 * The poles (phi) are at the positive and negative y axis.
	 * The equator starts at positive z.
	 */
	export default class SphericalCoordinates {
	  // Todo [rho, theta, phi] ?

	  // Cartographic (bearing 0 north, pitch 0 look from above)
	  bearing: number;
	  pitch: number;
	  altitude: number;

	  // lnglatZ coordinates
	  longitude: number;
	  latitude: number;
	  lng: number;
	  lat: number;
	  z: number;

	  /**
	   * @param {Object} options
	   * @param {Number} [options.phi] =0 - rotation around X (latitude)
	   * @param {Number} [options.theta] =0 - rotation around Y (longitude)
	   * @param {Number} [options.radius] =1 - Distance from center
	   * @param {Number} [options.bearing]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.altitude]
	   * @param {Number} [options.radiusScale] =1
	   */
	  constructor(options?: SphericalCoordinatesOptions);

	  fromLngLatZ(lngLatZ: number[]): SphericalCoordinates;
	  fromVector3(v: number[]): SphericalCoordinates;

	  clone(): SphericalCoordinates;
	  copy(other: SphericalCoordinates): SphericalCoordinates;
	  set(radius: number, phi: number, theta: number): SphericalCoordinates;

	  equals(other: SphericalCoordinates): boolean;
	  exactEquals(other: SphericalCoordinates): boolean;

	  toString(): string;
	  formatString(options?: FormatOptions): string;
	  toVector3(): Vector3;

	  // restrict phi to be betwee EPS and PI-EPS
	  makeSafe(): SphericalCoordinates;
	  check(): SphericalCoordinates;
	}

}
declare module '@math.gl/core/dist/esm/classes/euler' {
	import MathArray from '@math.gl/core/dist/esm/classes/base/math-array';
	import Quaternion from '@math.gl/core/dist/esm/classes/quaternion';
	import Matrix3 from '@math.gl/core/dist/esm/classes/matrix3';

	export default class Euler extends MathArray<Euler> {
	  static ZYX: number;
	  static YXZ: number;
	  static XZY: number;
	  static ZXY: number;
	  static YZX: number;
	  static XYZ: number;
	  static RollPitchYaw: number;
	  static DefaultOrder: number;
	  static RotationOrders: string[];

	  static rotationOrder(order: number): string;

	  ELEMENTS: number;

	  /**
	   * @class
	   * @param {Number | Number[]} x
	   * @param {Number=} [y]
	   * @param {Number=} [z]
	   * @param {Number=} [order]
	   */
	  constructor();
	  constructor(x: number, y: number, z: number, order?: number);
	  constructor(vector3: number[], order?: number);

	  fromQuaternion(quaternion: Quaternion): Euler;

	  // If copied array does contain fourth element, preserves currently set order
	  copy(array: number[]): Euler;

	  // Sets the three angles, and optionally sets the rotation order
	  // If order is not specified, preserves currently set order
	  set(x: number, y: number, z: number, order?: number): Euler;

	  validate(): boolean;

	  // Does not copy the orientation element
	  toArray(array?: number[], offset?: number): number[];

	  // Copies the orientation element
	  toArray4(array?: number[], offset?: number): number[];

	  toVector3(result?: number[]): number[];

	  // x, y, z angle notation (note: only corresponds to axis in XYZ orientation)
	  x: number;
	  y: number;
	  z: number;

	  // alpha, beta, gamma angle notation
	  alpha: number;
	  beta: number;
	  gamma: number;

	  // phi, theta, psi angle notation
	  phi: number;
	  theta: number;
	  psi: number;

	  // roll, pitch, yaw angle notation
	  roll: number;
	  pitch: number;
	  yaw: number;

	  // rotation order, in all three angle notations
	  order: number;

	  /* eslint-disable no-multi-spaces, brace-style, no-return-assign */

	  // Constructors
	  fromVector3(v: number[], order: number): Euler;
	  // TODO - with and without 4th element
	  fromArray(array: number[], offset?: number): Euler;

	  // Common ZYX rotation order
	  fromRollPitchYaw(roll: number, pitch: number, yaw: number): Euler;
	  fromRotationMatrix(m: number[], order?: number): Euler;

	  // ACCESSORS

	  getRotationMatrix(m: Matrix3): Matrix3;
	  getRotationMatrix(m?: number[]): number[];

	  // TODO - move to Quaternion
	  getQuaternion(): Quaternion;
	  toQuaternion(): Quaternion;
	}

}
declare module '@math.gl/core/dist/esm/classes/pose' {
	// Copyright (c) 2017 Uber Technologies, Inc.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.
	import Matrix4 from '@math.gl/core/dist/esm/classes/matrix4';
	import Vector3 from '@math.gl/core/dist/esm/classes/vector3';
	import Euler from '@math.gl/core/dist/esm/classes/euler';

	type PoseOptions = {
	  position?: number[];
	  orientation?: number[];
	  x?: number;
	  y?: number;
	  z?: number;
	  roll?: number;
	  pitch?: number;
	  yaw?: number;
	};

	export default class Pose {
	  /**
	   * A pose contains both rotation and rotations.
	   * Note that every single pose defines its own coordinate system
	   * (with the position of the pose in the origin, and zero rotations).
	   * These "pose relative" coordinate will be centered on the defining
	   * pose's position and with with the defining pose's orientation
	   * aligned with axis.
	   * @param {Object} options
	   * @param {Number[]} [options.position]
	   * @param {Number[]} [options.orientation]
	   * @param {Number} [options.x]
	   * @param {Number} [options.y]
	   * @param {Number} [options.z]
	   * @param {Number} [options.roll]
	   * @param {Number} [options.pitch]
	   * @param {Number} [options.yaw]
	   */
	  constructor(options?: PoseOptions);

	  x: number;
	  y: number;
	  z: number;
	  roll: number;
	  pitch: number;
	  yaw: number;

	  getPosition(): Vector3;
	  getOrientation(): Euler;

	  equals(pose: Pose): boolean;
	  exactEquals(pose: Pose): boolean;

	  /**
	   * Returns a 4x4 matrix that transforms a coordinates (in the same
	   * coordinate system as this pose) into the "pose-relative" coordinate
	   * system defined by this pose.
	   * The pose relative coordinates with have origin in the position of this
	   * pose, and axis will be aligned with the rotation of this pose.
	   */
	  getTransformationMatrix(): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * second coordinate system into the coordinate system of this pose.
	   */
	  getTransformationMatrixFromPose(pose: Pose): Matrix4;

	  /**
	   * Given a second pose that represent the same object in a second coordinate
	   * system, this method returns a 4x4 matrix that transforms coordinates in the
	   * coordinate system of this pose into the coordinate system of the second pose.
	   *
	   * Note: This method returns the inverse of `this.getTransformationMatrixFromPose(pose)`
	   */
	  getTransformationMatrixToPose(pose: Pose): Matrix4;
	}

}
declare module 'dist/esm' {
	// lib
	export * from '@math.gl/core/dist/esm/lib/common';

	// classes
	export {default as Vector2} from '@math.gl/core/dist/esm/classes/vector2';
	export {default as Vector3} from '@math.gl/core/dist/esm/classes/vector3';
	export {default as Vector4} from '@math.gl/core/dist/esm/classes/vector4';
	export {default as Matrix3} from '@math.gl/core/dist/esm/classes/matrix3';
	export {default as Matrix4} from '@math.gl/core/dist/esm/classes/matrix4';
	export {default as Quaternion} from '@math.gl/core/dist/esm/classes/quaternion';

	// extras

	// export {checkNumber} from './lib/validators';
	export function assert(condition: boolean, message?: string): void;

	// experimental
	export {default as SphericalCoordinates} from '@math.gl/core/dist/esm/classes/spherical-coordinates';
	export {default as Pose} from '@math.gl/core/dist/esm/classes/pose';
	export {default as Euler} from '@math.gl/core/dist/esm/classes/euler';

	export const _MathUtils: {
	  EPSILON1: number;
	  EPSILON2: number;
	  EPSILON3: number;
	  EPSILON4: number;
	  EPSILON5: number;
	  EPSILON6: number;
	  EPSILON7: number;
	  EPSILON8: number;
	  EPSILON9: number;
	  EPSILON10: number;
	  EPSILON11: number;
	  EPSILON12: number;
	  EPSILON13: number;
	  EPSILON14: number;
	  EPSILON15: number;
	  EPSILON16: number;
	  EPSILON17: number;
	  EPSILON18: number;
	  EPSILON19: number;
	  EPSILON20: number;

	  PI_OVER_TWO: number;
	  PI_OVER_FOUR: number;
	  PI_OVER_SIX: number;

	  TWO_PI: number;
	};

	// DEPRECATED
	export {default as _SphericalCoordinates} from '@math.gl/core/dist/esm/classes/spherical-coordinates';
	export {default as _Pose} from '@math.gl/core/dist/esm/classes/pose';
	export {default as _Euler} from '@math.gl/core/dist/esm/classes/euler';

}
declare module '@math.gl/core/dist/esm/addons/polygon' {
	import {NumberArray} from '@math.gl/core/@math.gl/core/';

	type SegmentVisitor = (p1: NumberArray, p2: NumberArray, i1: number, i2: number) => void;

	export default class Polygon {
	  constructor(
	    points: NumberArray | NumberArray[],
	    options?: {start?: number; end?: number; size?: number; isClosed?: boolean}
	  );

	  // https://en.wikipedia.org/wiki/Shoelace_formula
	  getSignedArea(): number;
	  getArea(): number;
	  getWindingDirection(): number;
	  forEachSegment(visitor: SegmentVisitor): void;
	  modifyWindingDirection(direction: number): boolean;
	}

}
declare module '@math.gl/core/lib/math-utils' {
	 const _default: {
	    EPSILON1: number;
	    EPSILON2: number;
	    EPSILON3: number;
	    EPSILON4: number;
	    EPSILON5: number;
	    EPSILON6: number;
	    EPSILON7: number;
	    EPSILON8: number;
	    EPSILON9: number;
	    EPSILON10: number;
	    EPSILON11: number;
	    EPSILON12: number;
	    EPSILON13: number;
	    EPSILON14: number;
	    EPSILON15: number;
	    EPSILON16: number;
	    EPSILON17: number;
	    EPSILON18: number;
	    EPSILON19: number;
	    EPSILON20: number;
	    PI_OVER_TWO: number;
	    PI_OVER_FOUR: number;
	    PI_OVER_SIX: number;
	    TWO_PI: number;
	};
	export default _default;

}
declare module '@math.gl/core' {
	export { default as Vector2 } from '@math.gl/core/classes/vector2';
	export { default as Vector3 } from '@math.gl/core/classes/vector3';
	export { default as Vector4 } from '@math.gl/core/classes/vector4';
	export { default as Matrix3 } from '@math.gl/core/classes/matrix3';
	export { default as Matrix4 } from '@math.gl/core/classes/matrix4';
	export { default as Quaternion } from '@math.gl/core/classes/quaternion';
	export { config, configure, formatValue, isArray, clone, equals, exactEquals, toRadians, toDegrees, radians, degrees, sin, cos, tan, asin, acos, atan, clamp, lerp, withEpsilon } from '@math.gl/core/lib/common';
	export { checkNumber } from '@math.gl/core/lib/validators';
	export { default as _MathUtils } from '@math.gl/core/lib/math-utils';
	export { default as SphericalCoordinates } from '@math.gl/core/classes/spherical-coordinates';
	export { default as Pose } from '@math.gl/core/classes/pose';
	export { default as Euler } from '@math.gl/core/classes/euler';
	export { default as assert } from '@math.gl/core/lib/assert';
	export { default as _SphericalCoordinates } from '@math.gl/core/classes/spherical-coordinates';
	export { default as _Pose } from '@math.gl/core/classes/pose';
	export { default as _Euler } from '@math.gl/core/classes/euler';

}
declare module '@math.gl/core/src/addons/polygon' {
	import {NumberArray} from '@math.gl/core/@math.gl/core/';

	type SegmentVisitor = (p1: NumberArray, p2: NumberArray, i1: number, i2: number) => void;

	export default class Polygon {
	  constructor(
	    points: NumberArray | NumberArray[],
	    options?: {start?: number; end?: number; size?: number; isClosed?: boolean}
	  );

	  // https://en.wikipedia.org/wiki/Shoelace_formula
	  getSignedArea(): number;
	  getArea(): number;
	  getWindingDirection(): number;
	  forEachSegment(visitor: SegmentVisitor): void;
	  modifyWindingDirection(direction: number): boolean;
	}

}
