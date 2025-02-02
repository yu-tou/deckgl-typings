//typings for @luma.gl/webgl v8.3.2
declare module '@luma.gl/webgl/dist/es5/init' {
	
	export class StatsManager {
	  constructor();
	  get(name: any): any;
	}

	export const lumaStats: StatsManager; const _default: any;
	export default _default;
}
declare module '@luma.gl/webgl/dist/es5/webgl-utils/request-animation-frame' {
		/// <reference types="@types/node" />
		export function requestAnimationFrame(callback: any): number | NodeJS.Timeout;
		export function cancelAnimationFrame(timerId: any): void;

}
declare module '@luma.gl/webgl/dist/es5/classes/accessor' {
	export default class Accessor {
	  static getBytesPerElement(accessor: any): number;
	  static getBytesPerVertex(accessor: any): number;
	  static resolve(...accessors: any[]): Accessor;
	  constructor(...accessors: any[]);
	  toString(): string;
	  get BYTES_PER_ELEMENT(): number;
	  get BYTES_PER_VERTEX(): number;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/resource' {
	export default class Resource {
	  readonly gl: WebGLRenderingContext;

	  constructor(gl: WebGLRenderingContext, opts?: {});
	  toString(): string;
	  get handle(): any;
	  delete({ deleteChildren }?: { deleteChildren?: boolean }): this;
	  bind(funcOrHandle?: any): any;
	  unbind(): void;
	  /**
	   * Query a Resource parameter
	   *
	   * @param {GLenum} pname
	   * @return {GLint|GLfloat|GLenum} param
	   */
	  getParameter(pname: any, opts?: {}): any;
	  getParameters(opts?: {}): {};
	  /**
	   * Update a Resource setting
	   *
	   * @todo - cache parameter to avoid issuing WebGL calls?
	   *
	   * @param {GLenum} pname - parameter (GL constant, value or key)
	   * @param {GLint|GLfloat|GLenum} value
	   * @return {Resource} returns self to enable chaining
	   */
	  setParameter(pname: any, value: any): this;
	  setParameters(parameters: any): this;
	  stubRemovedMethods(className: any, version: any, methodNames: any): void;
	  initialize(opts: any): void;

	  _trackAllocatedMemory(bytes: number, name?: string): void
	  _trackDeallocatedMemory(name?: string): void
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/buffer' {
	import Resource from "./resource";

	export default class Buffer extends Resource {
	  readonly byteLength: number;
	  readonly bytesUsed: number;
	  readonly usage: number;
	  readonly accessor: object;

	  constructor(gl: WebGLRenderingContext, props?: {});
	  getElementCount(accessor?: any): number;
	  getVertexCount(accessor?: any): number;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setAccessor(accessor: any): this;
	  reallocate(byteLength: any): boolean;
	  setData(props: any): this;
	  subData(props: any): this;
	  copyData(options: {
	    sourceBuffer: any;
	    readOffset?: number;
	    writeOffset?: number;
	    size: any;
	  }): this;
	  getData(options?: {
	    dstData?: any;
	    srcByteOffset?: number;
	    dstOffset?: number;
	    length?: number;
	  }): any;
	  /**
	   * Binds a buffer to a given binding point (target).
	   *   GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER take an index, and optionally a range.
	   *   - GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER need an index to affect state
	   *   - GL.UNIFORM_BUFFER: `offset` must be aligned to GL.UNIFORM_BUFFER_OFFSET_ALIGNMENT.
	   *   - GL.UNIFORM_BUFFER: `size` must be a minimum of GL.UNIFORM_BLOCK_SIZE_DATA.
	   */
	  bind(options?: {
	    target?: any;
	    index?: any;
	    offset?: number;
	    size: any;
	  }): this;
	  unbind(options?: { target?: any; index?: any }): this;
	  getDebugData(): {
	    data: any;
	    changed: boolean;
	  };
	  invalidateDebugData(): void;
	  get type(): any;
	  get bytes(): any;
	  setByteLength(byteLength: any): boolean;
	  updateAccessor(opts: any): this;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/shader' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export class Shader extends Resource {
	  static getTypeName(
	    shaderType: any
	  ): "vertex-shader" | "fragment-shader" | "unknown";
	  constructor(gl: WebGLRenderingContext, props: object);
	  initialize(options: { source: string }): void;
	  getParameter(pname: any): any;
	  toString(): string;
	  getName(): any;
	  getSource(): any;
	  getTranslatedSource(): any;
	}

	export class VertexShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

	export class FragmentShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/program-configuration' {
	export default class ProgramConfiguration {
	  constructor(program: any);
	  getAttributeInfo(locationOrName: any): any;
	  getAttributeLocation(locationOrName: any): any;
	  getAttributeAccessor(locationOrName: any): any;
	  getVaryingInfo(locationOrName: any): any;
	  getVaryingIndex(locationOrName: any): any;
	  getVaryingAccessor(locationOrName: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/program' {
	import Resource from "./resource";
	import ProgramConfiguration from './program-configuration';

	export default class Program extends Resource {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  delete(options?: {}): this;
	  setProps(props: any): this;
	  draw(options: {
	    logPriority?: any;
	    drawMode?: any;
	    vertexCount: any;
	    offset?: number;
	    start?: any;
	    end?: any;
	    isIndexed?: boolean;
	    indexType?: any;
	    instanceCount?: number;
	    isInstanced?: boolean;
	    vertexArray?: any;
	    transformFeedback?: any;
	    framebuffer?: any;
	    parameters?: {};
	    uniforms?: any;
	    samplers?: any;
	  }): boolean;
	  setUniforms(uniforms?: {}): this;
	  getActiveUniforms(uniformIndices: any, pname: any): any;
	  getUniformBlockIndex(blockName: any): any;
	  getActiveUniformBlockParameter(blockIndex: any, pname: any): any;
	  uniformBlockBinding(blockIndex: any, blockBinding: any): void;

	  // TEST
	  readonly configuration: ProgramConfiguration;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/framebuffer' {
	import Resource from "@luma.gl/webgl/classes/resource";
	export default class Framebuffer extends Resource {
	  readonly width: number;
	  readonly height: number;

	  static isSupported(
	    gl: WebGLRenderingContext,
	    options?: {
	      colorBufferFloat: any;
	      colorBufferHalfFloat: any;
	    }
	  ): boolean;
	  static getDefaultFramebuffer(gl: WebGLRenderingContext): any;
	  get MAX_COLOR_ATTACHMENTS(): any;
	  get MAX_DRAW_BUFFERS(): any;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  get color(): any;
	  get texture(): any;
	  get depth(): any;
	  get stencil(): any;
	  initialize(options?: {
	    width?: number;
	    height?: number;
	    attachments?: any;
	    color?: boolean;
	    depth?: boolean;
	    stencil?: boolean;
	    check?: boolean;
	    readBuffer: any;
	    drawBuffers: any;
	  }): void;
	  // @ts-ignore
	  delete(): void;
	  update(options?: {
	    attachments?: {};
	    readBuffer: any;
	    drawBuffers: any;
	    clearAttachments?: boolean;
	    resizeAttachments?: boolean;
	  }): this;
	  resize(options?: { width: any; height: any }): this;
	  attach(
	    attachments: any,
	    options?: {
	      clearAttachments?: boolean;
	      resizeAttachments?: boolean;
	    }
	  ): void;
	  checkStatus(): this;
	  getStatus(): any;
	  clear(options?: {
	    color?: any;
	    depth?: any;
	    stencil?: any;
	    drawBuffers?: any[];
	  }): this;
	  readPixels(opts?: {}): any;
	  readPixelsToBuffer(opts?: {}): any;
	  copyToDataUrl(opts?: {}): any;
	  copyToImage(opts?: {}): any;
	  copyToTexture(opts?: {}): any;
	  blit(opts?: {}): any;
	  invalidate(options: {
	    attachments?: any[];
	    x?: number;
	    y?: number;
	    width: any;
	    height: any;
	  }): this;
	  getAttachmentParameter(attachment: any, pname: any, keys: any): any;
	  getAttachmentParameters(attachment: any, keys: any, parameters?: any): {};
	  getParameters(keys?: boolean): {};
	  show(): this;
	  log(logLevel?: number, message?: string): this;
	  bind({ target }?: { target?: any }): this;
	  unbind({ target }?: { target?: any }): this;
	}

	export const FRAMEBUFFER_ATTACHMENT_PARAMETERS: any[];

}
declare module '@luma.gl/webgl/dist/es5/classes/texture' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Texture extends Resource {
		readonly width: number;
		readonly height: number;
		readonly depth: number;
		readonly target: any;

		static isSupported(gl: WebGLRenderingContext, options?: {
			format: any;
			linearFiltering: any;
		}): boolean;

		constructor(gl: WebGLRenderingContext, props: any);
		toString(): string;
		initialize(props?: {}): this | void;
		resize(options: {
			height: any;
			width: any;
			mipmaps?: boolean;
		}): this;
		generateMipmap(params?: {}): this;
		setImageData(options: any): this;

		/**
		 * Redefines an area of an existing texture
		 * Note: does not allocate storage
		 */
		setSubImageData(options: {
			target?: any;
			pixels?: any;
			data?: any;
			x?: number;
			y?: number;
			width?: any;
			height?: any;
			level?: number;
			format?: any;
			type?: any;
			dataFormat?: any;
			compressed?: boolean;
			offset?: number;
			border?: any;
			parameters?: {};
		}): void;

		/**
		 * Defines a two-dimensional texture image or cube-map texture image with
		 * pixels from the current framebuffer (rather than from client memory).
		 * (gl.copyTexImage2D wrapper)
		 *
		 * Note that binding a texture into a Framebuffer's color buffer and
		 * rendering can be faster.
		 */
		copyFramebuffer(opts?: {}): any;
		getActiveUnit(): number;
		bind(textureUnit?: any): any;
		unbind(textureUnit?: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/texture-2d' {
	import Texture from './texture';

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts?: object): boolean;

	  constructor(gl: WebGLRenderingContext, props?: object);
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/texture-cube' {
	
	import Texture from "@luma.gl/webgl/classes/texture";
	export default class TextureCube extends Texture {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): void;
	  subImage(options: {
	    face: any;
	    data: any;
	    x?: number;
	    y?: number;
	    mipmapLevel?: number;
	  }): any;
	  setCubeMapImageData(options: {
	    width: any;
	    height: any;
	    pixels: any;
	    data: any;
	    border?: number;
	    format?: any;
	    type?: any;
	  }): Promise<void>;
	  setImageDataForFace(options: any): this;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/copy-and-blit' {
	import Buffer from './buffer';
	import Framebuffer from './framebuffer';
	import Texture from './texture';

	// NOTE: Slow requires roundtrip to GPU
	// Copies data from a Framebuffer or a Texture object into ArrayBuffer object.
	// App can provide targetPixelArray or have it auto allocated by this method
	// @returns {Uint8Array|Uint16Array|FloatArray} - pixel array,
	//  newly allocated by this method unless provided by app.
	export function readPixelsToArray(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    sourceAttachment?: number,
	    target?: Uint8Array | Uint16Array | Float32Array,
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Uint8Array | Uint16Array | Float32Array;

	// NOTE: doesn't wait for copy to be complete, it programs GPU to perform a DMA transffer.
	// Copies data from a Framebuffer or a Texture object into a Buffer object.
	export function readPixelsToBuffer(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    target?: Buffer, // A new Buffer object is created when not provided.
	    targetByteOffset?: number, // byte offset in buffer object
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Buffer;

	// Reads pixels from a Framebuffer or Texture object to a dataUrl
	export function copyToDataUrl(
	  source,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetMaxHeight?: number
	  } 
	): string;

	// Reads pixels from a Framebuffer or Texture object into an HTML Image
	export function copyToImage(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetImage?: typeof Image
	  }
	): typeof Image;

	// Copy a rectangle from a Framebuffer or Texture object into a texture (at an offset)
	export function copyToTexture(
	  source: Framebuffer | Texture,
	  target: Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,

	    targetX?: number,
	    targetY?: number,
	    targetZ?: number,
	    targetMipmaplevel?: number,
	    targetInternalFormat?: number,

	    width?: number, // defaults to target width
	    height?: number // defaults to target height
	  }
	): Texture;

	// NOTE: WEBLG2 only
	// Copies a rectangle of pixels between Framebuffer or Texture objects
	// eslint-disable-next-line max-statements, complexity
	export function blit(
	  source,
	  target,
	  options: {
	    sourceAttachment?: number,
	    sourceX0?: number,
	    sourceY0?: number,
	    sourceX1?: number,
	    sourceY1?: number,
	    targetX0?: number,
	    targetY0?: number,
	    targetX1?: number,
	    targetY1?: number,
	    color?: boolean,
	    depth?: boolean,
	    stencil?: boolean,
	    mask?: number,
	    filter?: number
	  }
	): void;

}
declare module '@luma.gl/webgl/dist/es5/classes/query' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Query extends Resource {
	  static isSupported(gl: WebGLRenderingContext, opts?: any[]): boolean;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  beginTimeElapsedQuery(): this;
	  beginOcclusionQuery({ conservative }?: { conservative?: boolean }): this;
	  beginTransformFeedbackQuery(): this;
	  begin(target: any): this;
	  end(): this;
	  isResultAvailable(): any;
	  isTimerDisjoint(): any;
	  getResult(): any;
	  getTimerMilliseconds(): number;
	  createPoll(limit?: number): any;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/transform-feedback' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class TransformFeedback extends Resource {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  setProps(props: any): void;
	  setBuffers(buffers?: {}): this;
	  setBuffer(locationOrName: any, bufferOrParams: any): this;
	  begin(primitiveMode?: any): this;
	  end(): this;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/vertex-array-object' {
	import Resource from "./resource";

	export default class VertexArrayObject extends Resource {
	  static isSupported(gl: WebGLRenderingContext, options?: {}): boolean;
	  static getDefaultArray(gl: WebGLRenderingContext): any;
	  static getMaxAttributes(gl: WebGLRenderingContext): any;
	  static setConstant(gl: WebGLRenderingContext, location: any, array: any): void;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): this;
	  get MAX_ATTRIBUTES(): any;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setElementBuffer(elementBuffer?: any, opts?: {}): this;
	  setBuffer(location: any, buffer: any, accessor: any): this;
	  enable(location: any, enable?: boolean): this;
	  getConstantBuffer(elementCount: any, value: any, accessor: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/vertex-array' {
	import ProgramConfiguration from "./program-configuration";
	import VertexArrayObject from "./vertex-array-object";

	export default class VertexArray {
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): void;
	  initialize(props?: {}): this;
	  reset(): this;
	  setProps(props: any): this;
	  clearDrawParams(): void;
	  getDrawParams(): any;
	  setAttributes(attributes: any): this;
	  setElementBuffer(elementBuffer?: any, accessor?: {}): this;
	  setBuffer(locationOrName: any, buffer: any, appAccessor?: {}): this;
	  setConstant(locationOrName: any, arrayValue: any, appAccessor?: {}): this;
	  unbindBuffers(): this;
	  bindBuffers(): this;
	  bindForDraw(vertexCount: any, instanceCount: any, func: any): any;
	  setElements(elementBuffer?: any, accessor?: {}): this;

	  // FOR TESTING
	  readonly configuration: ProgramConfiguration | null;
	  readonly accessors: {size?: number}[];
	  readonly vertexArrayObject: VertexArrayObject;
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/uniform-buffer-layout' {
	/**
	 * Std140 layout for uniforms
	 */
	export default class UniformBufferLayout {
	  constructor(layout: any);
	  getBytes(): number;
	  getData(): any;
	  getSubData(
	    index: any
	  ): {
	    data: any;
	    offset: any;
	  };
	  setUniforms(values: any): this;
	  _setValue(key: any, value: any): void;
	  _addUniform(key: any, uniformType: any): void;
	  _alignTo(size: any, count: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es5/utils/assert' {
	export default function assert(condition: any, message?: string): void;

}
declare module '@luma.gl/webgl/dist/es5/utils/utils' {
	/**
	 * Returns a UID.
	 * @param {String} id= - Identifier base name
	 * @return {number} uid
	 **/
	export function uid(id?: string): string;
	/**
	 * Verifies if a given number is power of two or not.
	 * @param {object} n - The number to check.
	 * @return {Array} Returns true if the given number is power of 2, false otherwise.
	 **/
	export function isPowerOfTwo(n: any): boolean;
	export function isObjectEmpty(obj: any): boolean;

}
declare module '@luma.gl/webgl/dist/es5/debug/debug-uniforms' {
	export function getDebugTableForUniforms(options?: {
	  header?: string;
	  program: any;
	  uniforms: any;
	  undefinedOnly?: boolean;
	}): {
	  table: {};
	  count: number;
	  unusedTable: {};
	  unusedCount: number;
	};

}
declare module '@luma.gl/webgl/dist/es5/debug/debug-vertex-array' {
	export function getDebugTableForVertexArray(options?: {
	  vertexArray: any;
	  header?: string;
	}): {};


}
declare module '@luma.gl/webgl/dist/es5/debug/debug-program-configuration' {
	export function getDebugTableForProgramConfiguration(
	  config: any
	): {};

}
declare module 'dist/es5' {
	/*
	declare module "@luma.gl/webgl/classes/texture-formats" {
		export const TEXTURE_FORMATS: {
			[x: number]:
			| {
				dataFormat: any;
				types: any[];
				gl2?: undefined;
			}
			| {
				dataFormat: any;
				types: any[];
				gl2: boolean;
			};
		};
		export const DATA_FORMAT_CHANNELS: {
			[x: number]: number;
		};
		export const TYPE_SIZES: {
			[x: number]: number;
		};
		export function isFormatSupported(gl: WebGLRenderingContext, format: any): any;
		export function isLinearFilteringSupported(gl: WebGLRenderingContext, format: any): any;
	}
	declare module "@luma.gl/webgl/utils/load-file" {
		export function setPathPrefix(prefix: any): void;
		export function loadFile(url: any, options?: {}): Promise<any>;
		export function loadImage(url: any, opts: any): Promise<unknown>;
	}

	declare module "@luma.gl/webgl/classes/renderbuffer-formats" {
		const _default: {
			[x: number]:
			| {
				bpp: number;
				gl2?: undefined;
			}
			| {
				gl2: boolean;
				bpp: number;
			}
			| {
				gl2: string;
				bpp: number;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/classes/renderbuffer" {
		import Resource from "@luma.gl/webgl/classes/resource";
		export default class Renderbuffer extends Resource {
			static isSupported(
				gl: WebGLRenderingContext,
				{
					format,
				}?: {
					format: any;
				}
			): any;
			static getSamplesForFormat(
				gl: WebGLRenderingContext,
				{
					format,
				}: {
					format: any;
				}
			): any;
			constructor(gl: WebGLRenderingContext, opts?: {});
			initialize({
				format,
				width,
				height,
				samples,
			}: {
				format: any;
				width?: number;
				height?: number;
				samples?: number;
			}): this;
			resize({ width, height }: { width: any; height: any }): this;
			_createHandle(): any;
			_deleteHandle(): void;
			_bindHandle(handle: any): void;
			_syncHandle(handle: any): void;
			_getParameter(pname: any): any;
		}
	}
	declare module "@luma.gl/webgl/classes/clear" {
		export function clear(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				color,
				depth,
				stencil,
			}?: {
				framebuffer?: any;
				color?: any;
				depth?: any;
				stencil?: any;
			}
		): void;
		export function clearBuffer(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				buffer,
				drawBuffer,
				value,
			}?: {
				framebuffer?: any;
				buffer?: number;
				drawBuffer?: number;
				value?: number[];
			}
		): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/format-utils" {
		export function glFormatToComponents(format: any): 1 | 0 | 2 | 4 | 3;
		export function glTypeToBytes(type: any): 1 | 0 | 2 | 4;
	}
	declare module "@luma.gl/webgl/classes/copy-and-blit" {
		export function readPixelsToArray(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				sourceAttachment, // TODO - support gl.readBuffer
				target,
				sourceWidth,
				sourceHeight,
				sourceType,
			}?: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				sourceAttachment?: any;
				target?: any;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function readPixelsToBuffer(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				target, // A new Buffer object is created when not provided.
				targetByteOffset, // byte offset in buffer object
				sourceWidth,
				sourceHeight,
				sourceType,
			}: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				target?: any;
				targetByteOffset?: number;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function copyToDataUrl(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetMaxHeight,
			}?: {
				sourceAttachment?: any;
				targetMaxHeight?: number;
			}
		): string;
		export function copyToImage(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetImage,
			}?: {
				sourceAttachment?: any;
				targetImage?: any;
			}
		): any;
		export function copyToTexture(
			source: any,
			target: any,
			{
				sourceX,
				sourceY,
				targetX,
				targetY,
				targetZ,
				targetMipmaplevel,
				targetInternalFormat,
				width, // defaults to target width
				height,
			}?: {
				sourceX?: number;
				sourceY?: number;
				targetX: any;
				targetY: any;
				targetZ: any;
				targetMipmaplevel?: number;
				targetInternalFormat?: any;
				width: any;
				height: any;
			}
		): any;
		export function blit(
			source: any,
			target: any,
			{
				sourceAttachment,
				sourceX0,
				sourceY0,
				sourceX1,
				sourceY1,
				targetX0,
				targetY0,
				targetX1,
				targetY1,
				color,
				depth,
				stencil,
				mask,
				filter,
			}?: {
				sourceAttachment?: any;
				sourceX0?: number;
				sourceY0?: number;
				sourceX1: any;
				sourceY1: any;
				targetX0?: number;
				targetY0?: number;
				targetX1: any;
				targetY1: any;
				color?: boolean;
				depth?: boolean;
				stencil?: boolean;
				mask?: number;
				filter?: any;
			}
		): any;
	}
	declare module "@luma.gl/webgl/features/webgl-limits-table" {
		const _default: {
			[x: number]:
			| {
				gl1: Float32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: Int32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative: boolean;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/limits" {
		export function getContextLimits(gl: WebGLRenderingContext): any;
		export function getGLContextInfo(gl: WebGLRenderingContext): any;
		export function getContextInfo(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/webgl-features-table" {
		export const FEATURES: {
			WEBGL2: string;
			VERTEX_ARRAY_OBJECT: string;
			TIMER_QUERY: string;
			INSTANCED_RENDERING: string;
			MULTIPLE_RENDER_TARGETS: string;
			ELEMENT_INDEX_UINT32: string;
			BLEND_EQUATION_MINMAX: string;
			FLOAT_BLEND: string;
			COLOR_ENCODING_SRGB: string;
			TEXTURE_DEPTH: string;
			TEXTURE_FLOAT: string;
			TEXTURE_HALF_FLOAT: string;
			TEXTURE_FILTER_LINEAR_FLOAT: string;
			TEXTURE_FILTER_LINEAR_HALF_FLOAT: string;
			TEXTURE_FILTER_ANISOTROPIC: string;
			COLOR_ATTACHMENT_RGBA32F: string;
			COLOR_ATTACHMENT_FLOAT: string;
			COLOR_ATTACHMENT_HALF_FLOAT: string;
			GLSL_FRAG_DATA: string;
			GLSL_FRAG_DEPTH: string;
			GLSL_DERIVATIVES: string;
			GLSL_TEXTURE_LOD: string;
		};
		function checkFloat32ColorAttachment(gl: WebGLRenderingContext): boolean;
		const _default: {
			[x: string]:
			| (string | boolean)[]
			| (string | typeof checkFloat32ColorAttachment)[];
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/features" {
		export function hasFeature(gl: WebGLRenderingContext, feature: any): any;
		export function hasFeatures(gl: WebGLRenderingContext, features: any): any;
		export function getFeatures(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/check-old-ie" {
		export default function isOldIE(opts?: {}): boolean;
	}
	declare module "@luma.gl/webgl/features/check-glsl-extension" {
		export default function canCompileGLGSExtension(
			gl: WebGLRenderingContext,
			cap: any,
			options?: {}
		): any;
	}
	declare module "features" {
		export {
			getContextInfo,
			getGLContextInfo,
			getContextLimits,
		} from "@luma.gl/webgl/features/limits";
		export { FEATURES } from "@luma.gl/webgl/features/webgl-features-table";
		export {
			hasFeature,
			hasFeatures,
			getFeatures,
		} from "@luma.gl/webgl/features/features";
		export { default as canCompileGLGSExtension } from "@luma.gl/webgl/features/check-glsl-extension";
	}

	declare module "@luma.gl/webgl/webgl-utils/texture-utils" {
		import Framebuffer from "@luma.gl/webgl/classes/framebuffer";
		export function cloneTextureFrom(refTexture: any, overrides: any): any;
		export function toFramebuffer(texture: any, opts: any): Framebuffer;
	}

	export default function getShaderName(shader: any, defaultName?: string): any;
	export default function getShaderTypeName(
		type: any
	): "fragment" | "vertex" | "unknown type";
	export default function getShaderVersion(source: any): number;

	declare module "@luma.gl/webgl/classes/uniforms" {
		export function parseUniformName(
			name: any
		): {
			name: any;
			length: any;
			isArray: boolean;
		};
		export function getUniformSetter(gl: WebGLRenderingContext, location: any, info: any): any;
		export function checkUniformValues(
			uniforms: any,
			source: any,
			uniformMap: any
		): boolean;
		/**
		 * Creates a copy of the uniform
		 *
		export function copyUniform(uniforms: any, key: any, value: any): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/attribute-utils" {
		export function getPrimitiveDrawMode(drawMode: any): 1 | 0 | 4;
		export function getPrimitiveCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function getVertexCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function decomposeCompositeGLType(
			compositeGLType: any
		): {
			type: any;
			components: any;
		};
		export function getCompositeGLType(
			type: any,
			components: any
		): {
			glType: string;
			name: any;
		};
	}
	declare module "@luma.gl/webgl/utils/array-utils-flat" {
		export function getScratchArrayBuffer(byteLength: any): any;
		export function getScratchArray(Type: any, length: any): any;
		export function fillArray({
			target,
			source,
			start,
			count,
		}: {
			target: any;
			source: any;
			start?: number;
			count?: number;
		}): any;
	}
	declare module "@luma.gl/webgl/classes/vertex-array-object" {
	}
	*/

	// luma.gl Base WebGL wrapper library
	// Provides simple class/function wrappers around the low level webgl objects
	// These classes are intentionally close to the WebGL API
	// but make it easier to use.
	// Higher level abstractions can be built on these classes

	// Initialize any global state
	export {lumaStats} from './init';

	// UTILS
	export {requestAnimationFrame, cancelAnimationFrame} from './webgl-utils/request-animation-frame';

	// WebGL Functions
	export {cloneTextureFrom} from './webgl-utils/texture-utils';
	export {getKeyValue, getKey} from './webgl-utils/constants-to-keys';
	export {getContextInfo, getGLContextInfo, getContextLimits} from './features/limits';
	export {FEATURES} from './features/webgl-features-table';
	export {hasFeature, hasFeatures, getFeatures} from './features/features';
	export {default as canCompileGLGSExtension} from './features/check-glsl-extension';

	// WebGL Helper Classes
	export {default as Accessor} from './classes/accessor';

	// WebGL1 classes
	export {default as Buffer} from './classes/buffer';
	export {Shader, VertexShader, FragmentShader} from './classes/shader';
	export {default as Program} from './classes/program';
	export {default as Framebuffer} from './classes/framebuffer';
	export {default as Renderbuffer} from './classes/renderbuffer';
	export {default as Texture2D} from './classes/texture-2d';
	export {default as TextureCube} from './classes/texture-cube';

	export {clear, clearBuffer} from './classes/clear';

	// Copy and Blit
	export {
	  readPixelsToArray,
	  readPixelsToBuffer,
	  copyToDataUrl,
	  copyToImage,
	  copyToTexture,
	  blit
	} from './classes/copy-and-blit';

	// WebGL2 classes & Extensions
	export {default as Query} from './classes/query';
	export {default as Texture3D} from './classes/texture-3d';
	export {default as TransformFeedback} from './classes/transform-feedback';
	export {default as VertexArrayObject} from './classes/vertex-array-object';
	export {default as VertexArray} from './classes/vertex-array';
	export {default as UniformBufferLayout} from './classes/uniform-buffer-layout';

	// experimental WebGL exports

	export {setPathPrefix, loadFile, loadImage} from './utils/load-file';

	// PARSE SHADER SOURCE
	export {default as getShaderName} from './glsl-utils/get-shader-name';
	export {default as getShaderVersion} from './glsl-utils/get-shader-version';

	// UTILS
	export {log} from '@luma.gl/gltools';
	export {default as assert} from './utils/assert';
	export {uid, isObjectEmpty} from './utils/utils';

	// INTERNAL
	export {parseUniformName, getUniformSetter} from './classes/uniforms';
	export {getDebugTableForUniforms} from './debug/debug-uniforms';
	export {getDebugTableForVertexArray} from './debug/debug-vertex-array';
	export {getDebugTableForProgramConfiguration} from './debug/debug-program-configuration';

}
declare module '@luma.gl/webgl/dist/es5/classes/texture-2d-array' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts: any): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	}

}
declare module '@luma.gl/webgl/dist/es5/classes/texture3d' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture3D extends Texture {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  setImageData(options: {
	    level?: number;
	    dataFormat?: any;
	    width: any;
	    height: any;
	    depth?: number;
	    border?: number;
	    format: any;
	    type?: any;
	    offset?: number;
	    data: any;
	    parameters?: {};
	  }): this;
	}

}
declare module '@luma.gl/webgl/dist/es5/glsl-utils/format-glsl-error' {
	export default function formatGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any
	): string;

	/**
	 * Parse a GLSL compiler error log into a string showing the source code around each error.
	 * Based on https://github.com/wwwtyro/gl-format-compiler-error (public domain)
	 */
	export function parseGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any,
	  shaderName: any
	): {
	  shaderName: string;
	  errors: string;
	  warnings: string;
	};

}
declare module '@luma.gl/webgl/dist/es5/utils/is-old-ie' {
	export default function isOldIE(opts?: {}): boolean;

}
declare module '@luma.gl/webgl/dist/es5/webgl-utils/typed-array-utils' {
	type TypedArrayConstructor =
	  Float32ArrayConstructor
	  | Uint16ArrayConstructor
	  | Uint32ArrayConstructor
	  | Uint8ArrayConstructor
	  | Uint8ClampedArrayConstructor
	  | Int8ArrayConstructor
	  | Int16ArrayConstructor
	  | Int32ArrayConstructor;

	export function getGLTypeFromTypedArray(arrayOrType: any): any;

	export function getTypedArrayFromGLType(glType: any, options?: {
	  clamped?: boolean;
	}): TypedArrayConstructor;

	export function flipRows(options: {
	  data: any;
	  width: any;
	  height: any;
	  bytesPerPixel?: number;
	  temp: any;
	}): void;

	export function scalePixels(options: {
	  data: any;
	  width: any;
	  height: any;
	}): {
	  data: Uint8Array;
	  width: number;
	  height: number;
	};

}
declare module '@luma.gl/webgl/dist/es6/init' {
	
	export class StatsManager {
	  constructor();
	  get(name: any): any;
	}

	export const lumaStats: StatsManager; const _default: any;
	export default _default;
}
declare module '@luma.gl/webgl/dist/es6/webgl-utils/request-animation-frame' {
		/// <reference types="@types/node" />
		export function requestAnimationFrame(callback: any): number | NodeJS.Timeout;
		export function cancelAnimationFrame(timerId: any): void;

}
declare module '@luma.gl/webgl/dist/es6/classes/accessor' {
	export default class Accessor {
	  static getBytesPerElement(accessor: any): number;
	  static getBytesPerVertex(accessor: any): number;
	  static resolve(...accessors: any[]): Accessor;
	  constructor(...accessors: any[]);
	  toString(): string;
	  get BYTES_PER_ELEMENT(): number;
	  get BYTES_PER_VERTEX(): number;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/resource' {
	export default class Resource {
	  readonly gl: WebGLRenderingContext;

	  constructor(gl: WebGLRenderingContext, opts?: {});
	  toString(): string;
	  get handle(): any;
	  delete({ deleteChildren }?: { deleteChildren?: boolean }): this;
	  bind(funcOrHandle?: any): any;
	  unbind(): void;
	  /**
	   * Query a Resource parameter
	   *
	   * @param {GLenum} pname
	   * @return {GLint|GLfloat|GLenum} param
	   */
	  getParameter(pname: any, opts?: {}): any;
	  getParameters(opts?: {}): {};
	  /**
	   * Update a Resource setting
	   *
	   * @todo - cache parameter to avoid issuing WebGL calls?
	   *
	   * @param {GLenum} pname - parameter (GL constant, value or key)
	   * @param {GLint|GLfloat|GLenum} value
	   * @return {Resource} returns self to enable chaining
	   */
	  setParameter(pname: any, value: any): this;
	  setParameters(parameters: any): this;
	  stubRemovedMethods(className: any, version: any, methodNames: any): void;
	  initialize(opts: any): void;

	  _trackAllocatedMemory(bytes: number, name?: string): void
	  _trackDeallocatedMemory(name?: string): void
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/buffer' {
	import Resource from "./resource";

	export default class Buffer extends Resource {
	  readonly byteLength: number;
	  readonly bytesUsed: number;
	  readonly usage: number;
	  readonly accessor: object;

	  constructor(gl: WebGLRenderingContext, props?: {});
	  getElementCount(accessor?: any): number;
	  getVertexCount(accessor?: any): number;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setAccessor(accessor: any): this;
	  reallocate(byteLength: any): boolean;
	  setData(props: any): this;
	  subData(props: any): this;
	  copyData(options: {
	    sourceBuffer: any;
	    readOffset?: number;
	    writeOffset?: number;
	    size: any;
	  }): this;
	  getData(options?: {
	    dstData?: any;
	    srcByteOffset?: number;
	    dstOffset?: number;
	    length?: number;
	  }): any;
	  /**
	   * Binds a buffer to a given binding point (target).
	   *   GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER take an index, and optionally a range.
	   *   - GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER need an index to affect state
	   *   - GL.UNIFORM_BUFFER: `offset` must be aligned to GL.UNIFORM_BUFFER_OFFSET_ALIGNMENT.
	   *   - GL.UNIFORM_BUFFER: `size` must be a minimum of GL.UNIFORM_BLOCK_SIZE_DATA.
	   */
	  bind(options?: {
	    target?: any;
	    index?: any;
	    offset?: number;
	    size: any;
	  }): this;
	  unbind(options?: { target?: any; index?: any }): this;
	  getDebugData(): {
	    data: any;
	    changed: boolean;
	  };
	  invalidateDebugData(): void;
	  get type(): any;
	  get bytes(): any;
	  setByteLength(byteLength: any): boolean;
	  updateAccessor(opts: any): this;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/shader' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export class Shader extends Resource {
	  static getTypeName(
	    shaderType: any
	  ): "vertex-shader" | "fragment-shader" | "unknown";
	  constructor(gl: WebGLRenderingContext, props: object);
	  initialize(options: { source: string }): void;
	  getParameter(pname: any): any;
	  toString(): string;
	  getName(): any;
	  getSource(): any;
	  getTranslatedSource(): any;
	}

	export class VertexShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

	export class FragmentShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/program-configuration' {
	export default class ProgramConfiguration {
	  constructor(program: any);
	  getAttributeInfo(locationOrName: any): any;
	  getAttributeLocation(locationOrName: any): any;
	  getAttributeAccessor(locationOrName: any): any;
	  getVaryingInfo(locationOrName: any): any;
	  getVaryingIndex(locationOrName: any): any;
	  getVaryingAccessor(locationOrName: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/program' {
	import Resource from "./resource";
	import ProgramConfiguration from './program-configuration';

	export default class Program extends Resource {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  delete(options?: {}): this;
	  setProps(props: any): this;
	  draw(options: {
	    logPriority?: any;
	    drawMode?: any;
	    vertexCount: any;
	    offset?: number;
	    start?: any;
	    end?: any;
	    isIndexed?: boolean;
	    indexType?: any;
	    instanceCount?: number;
	    isInstanced?: boolean;
	    vertexArray?: any;
	    transformFeedback?: any;
	    framebuffer?: any;
	    parameters?: {};
	    uniforms?: any;
	    samplers?: any;
	  }): boolean;
	  setUniforms(uniforms?: {}): this;
	  getActiveUniforms(uniformIndices: any, pname: any): any;
	  getUniformBlockIndex(blockName: any): any;
	  getActiveUniformBlockParameter(blockIndex: any, pname: any): any;
	  uniformBlockBinding(blockIndex: any, blockBinding: any): void;

	  // TEST
	  readonly configuration: ProgramConfiguration;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/framebuffer' {
	import Resource from "@luma.gl/webgl/classes/resource";
	export default class Framebuffer extends Resource {
	  readonly width: number;
	  readonly height: number;

	  static isSupported(
	    gl: WebGLRenderingContext,
	    options?: {
	      colorBufferFloat: any;
	      colorBufferHalfFloat: any;
	    }
	  ): boolean;
	  static getDefaultFramebuffer(gl: WebGLRenderingContext): any;
	  get MAX_COLOR_ATTACHMENTS(): any;
	  get MAX_DRAW_BUFFERS(): any;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  get color(): any;
	  get texture(): any;
	  get depth(): any;
	  get stencil(): any;
	  initialize(options?: {
	    width?: number;
	    height?: number;
	    attachments?: any;
	    color?: boolean;
	    depth?: boolean;
	    stencil?: boolean;
	    check?: boolean;
	    readBuffer: any;
	    drawBuffers: any;
	  }): void;
	  // @ts-ignore
	  delete(): void;
	  update(options?: {
	    attachments?: {};
	    readBuffer: any;
	    drawBuffers: any;
	    clearAttachments?: boolean;
	    resizeAttachments?: boolean;
	  }): this;
	  resize(options?: { width: any; height: any }): this;
	  attach(
	    attachments: any,
	    options?: {
	      clearAttachments?: boolean;
	      resizeAttachments?: boolean;
	    }
	  ): void;
	  checkStatus(): this;
	  getStatus(): any;
	  clear(options?: {
	    color?: any;
	    depth?: any;
	    stencil?: any;
	    drawBuffers?: any[];
	  }): this;
	  readPixels(opts?: {}): any;
	  readPixelsToBuffer(opts?: {}): any;
	  copyToDataUrl(opts?: {}): any;
	  copyToImage(opts?: {}): any;
	  copyToTexture(opts?: {}): any;
	  blit(opts?: {}): any;
	  invalidate(options: {
	    attachments?: any[];
	    x?: number;
	    y?: number;
	    width: any;
	    height: any;
	  }): this;
	  getAttachmentParameter(attachment: any, pname: any, keys: any): any;
	  getAttachmentParameters(attachment: any, keys: any, parameters?: any): {};
	  getParameters(keys?: boolean): {};
	  show(): this;
	  log(logLevel?: number, message?: string): this;
	  bind({ target }?: { target?: any }): this;
	  unbind({ target }?: { target?: any }): this;
	}

	export const FRAMEBUFFER_ATTACHMENT_PARAMETERS: any[];

}
declare module '@luma.gl/webgl/dist/es6/classes/texture' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Texture extends Resource {
		readonly width: number;
		readonly height: number;
		readonly depth: number;
		readonly target: any;

		static isSupported(gl: WebGLRenderingContext, options?: {
			format: any;
			linearFiltering: any;
		}): boolean;

		constructor(gl: WebGLRenderingContext, props: any);
		toString(): string;
		initialize(props?: {}): this | void;
		resize(options: {
			height: any;
			width: any;
			mipmaps?: boolean;
		}): this;
		generateMipmap(params?: {}): this;
		setImageData(options: any): this;

		/**
		 * Redefines an area of an existing texture
		 * Note: does not allocate storage
		 */
		setSubImageData(options: {
			target?: any;
			pixels?: any;
			data?: any;
			x?: number;
			y?: number;
			width?: any;
			height?: any;
			level?: number;
			format?: any;
			type?: any;
			dataFormat?: any;
			compressed?: boolean;
			offset?: number;
			border?: any;
			parameters?: {};
		}): void;

		/**
		 * Defines a two-dimensional texture image or cube-map texture image with
		 * pixels from the current framebuffer (rather than from client memory).
		 * (gl.copyTexImage2D wrapper)
		 *
		 * Note that binding a texture into a Framebuffer's color buffer and
		 * rendering can be faster.
		 */
		copyFramebuffer(opts?: {}): any;
		getActiveUnit(): number;
		bind(textureUnit?: any): any;
		unbind(textureUnit?: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/texture-2d' {
	import Texture from './texture';

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts?: object): boolean;

	  constructor(gl: WebGLRenderingContext, props?: object);
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/texture-cube' {
	
	import Texture from "@luma.gl/webgl/classes/texture";
	export default class TextureCube extends Texture {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): void;
	  subImage(options: {
	    face: any;
	    data: any;
	    x?: number;
	    y?: number;
	    mipmapLevel?: number;
	  }): any;
	  setCubeMapImageData(options: {
	    width: any;
	    height: any;
	    pixels: any;
	    data: any;
	    border?: number;
	    format?: any;
	    type?: any;
	  }): Promise<void>;
	  setImageDataForFace(options: any): this;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/copy-and-blit' {
	import Buffer from './buffer';
	import Framebuffer from './framebuffer';
	import Texture from './texture';

	// NOTE: Slow requires roundtrip to GPU
	// Copies data from a Framebuffer or a Texture object into ArrayBuffer object.
	// App can provide targetPixelArray or have it auto allocated by this method
	// @returns {Uint8Array|Uint16Array|FloatArray} - pixel array,
	//  newly allocated by this method unless provided by app.
	export function readPixelsToArray(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    sourceAttachment?: number,
	    target?: Uint8Array | Uint16Array | Float32Array,
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Uint8Array | Uint16Array | Float32Array;

	// NOTE: doesn't wait for copy to be complete, it programs GPU to perform a DMA transffer.
	// Copies data from a Framebuffer or a Texture object into a Buffer object.
	export function readPixelsToBuffer(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    target?: Buffer, // A new Buffer object is created when not provided.
	    targetByteOffset?: number, // byte offset in buffer object
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Buffer;

	// Reads pixels from a Framebuffer or Texture object to a dataUrl
	export function copyToDataUrl(
	  source,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetMaxHeight?: number
	  } 
	): string;

	// Reads pixels from a Framebuffer or Texture object into an HTML Image
	export function copyToImage(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetImage?: typeof Image
	  }
	): typeof Image;

	// Copy a rectangle from a Framebuffer or Texture object into a texture (at an offset)
	export function copyToTexture(
	  source: Framebuffer | Texture,
	  target: Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,

	    targetX?: number,
	    targetY?: number,
	    targetZ?: number,
	    targetMipmaplevel?: number,
	    targetInternalFormat?: number,

	    width?: number, // defaults to target width
	    height?: number // defaults to target height
	  }
	): Texture;

	// NOTE: WEBLG2 only
	// Copies a rectangle of pixels between Framebuffer or Texture objects
	// eslint-disable-next-line max-statements, complexity
	export function blit(
	  source,
	  target,
	  options: {
	    sourceAttachment?: number,
	    sourceX0?: number,
	    sourceY0?: number,
	    sourceX1?: number,
	    sourceY1?: number,
	    targetX0?: number,
	    targetY0?: number,
	    targetX1?: number,
	    targetY1?: number,
	    color?: boolean,
	    depth?: boolean,
	    stencil?: boolean,
	    mask?: number,
	    filter?: number
	  }
	): void;

}
declare module '@luma.gl/webgl/dist/es6/classes/query' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Query extends Resource {
	  static isSupported(gl: WebGLRenderingContext, opts?: any[]): boolean;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  beginTimeElapsedQuery(): this;
	  beginOcclusionQuery({ conservative }?: { conservative?: boolean }): this;
	  beginTransformFeedbackQuery(): this;
	  begin(target: any): this;
	  end(): this;
	  isResultAvailable(): any;
	  isTimerDisjoint(): any;
	  getResult(): any;
	  getTimerMilliseconds(): number;
	  createPoll(limit?: number): any;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/transform-feedback' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class TransformFeedback extends Resource {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  setProps(props: any): void;
	  setBuffers(buffers?: {}): this;
	  setBuffer(locationOrName: any, bufferOrParams: any): this;
	  begin(primitiveMode?: any): this;
	  end(): this;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/vertex-array-object' {
	import Resource from "./resource";

	export default class VertexArrayObject extends Resource {
	  static isSupported(gl: WebGLRenderingContext, options?: {}): boolean;
	  static getDefaultArray(gl: WebGLRenderingContext): any;
	  static getMaxAttributes(gl: WebGLRenderingContext): any;
	  static setConstant(gl: WebGLRenderingContext, location: any, array: any): void;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): this;
	  get MAX_ATTRIBUTES(): any;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setElementBuffer(elementBuffer?: any, opts?: {}): this;
	  setBuffer(location: any, buffer: any, accessor: any): this;
	  enable(location: any, enable?: boolean): this;
	  getConstantBuffer(elementCount: any, value: any, accessor: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/vertex-array' {
	import ProgramConfiguration from "./program-configuration";
	import VertexArrayObject from "./vertex-array-object";

	export default class VertexArray {
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): void;
	  initialize(props?: {}): this;
	  reset(): this;
	  setProps(props: any): this;
	  clearDrawParams(): void;
	  getDrawParams(): any;
	  setAttributes(attributes: any): this;
	  setElementBuffer(elementBuffer?: any, accessor?: {}): this;
	  setBuffer(locationOrName: any, buffer: any, appAccessor?: {}): this;
	  setConstant(locationOrName: any, arrayValue: any, appAccessor?: {}): this;
	  unbindBuffers(): this;
	  bindBuffers(): this;
	  bindForDraw(vertexCount: any, instanceCount: any, func: any): any;
	  setElements(elementBuffer?: any, accessor?: {}): this;

	  // FOR TESTING
	  readonly configuration: ProgramConfiguration | null;
	  readonly accessors: {size?: number}[];
	  readonly vertexArrayObject: VertexArrayObject;
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/uniform-buffer-layout' {
	/**
	 * Std140 layout for uniforms
	 */
	export default class UniformBufferLayout {
	  constructor(layout: any);
	  getBytes(): number;
	  getData(): any;
	  getSubData(
	    index: any
	  ): {
	    data: any;
	    offset: any;
	  };
	  setUniforms(values: any): this;
	  _setValue(key: any, value: any): void;
	  _addUniform(key: any, uniformType: any): void;
	  _alignTo(size: any, count: any): any;
	}

}
declare module '@luma.gl/webgl/dist/es6/utils/assert' {
	export default function assert(condition: any, message?: string): void;

}
declare module '@luma.gl/webgl/dist/es6/utils/utils' {
	/**
	 * Returns a UID.
	 * @param {String} id= - Identifier base name
	 * @return {number} uid
	 **/
	export function uid(id?: string): string;
	/**
	 * Verifies if a given number is power of two or not.
	 * @param {object} n - The number to check.
	 * @return {Array} Returns true if the given number is power of 2, false otherwise.
	 **/
	export function isPowerOfTwo(n: any): boolean;
	export function isObjectEmpty(obj: any): boolean;

}
declare module '@luma.gl/webgl/dist/es6/debug/debug-uniforms' {
	export function getDebugTableForUniforms(options?: {
	  header?: string;
	  program: any;
	  uniforms: any;
	  undefinedOnly?: boolean;
	}): {
	  table: {};
	  count: number;
	  unusedTable: {};
	  unusedCount: number;
	};

}
declare module '@luma.gl/webgl/dist/es6/debug/debug-vertex-array' {
	export function getDebugTableForVertexArray(options?: {
	  vertexArray: any;
	  header?: string;
	}): {};


}
declare module '@luma.gl/webgl/dist/es6/debug/debug-program-configuration' {
	export function getDebugTableForProgramConfiguration(
	  config: any
	): {};

}
declare module 'dist/es6' {
	/*
	declare module "@luma.gl/webgl/classes/texture-formats" {
		export const TEXTURE_FORMATS: {
			[x: number]:
			| {
				dataFormat: any;
				types: any[];
				gl2?: undefined;
			}
			| {
				dataFormat: any;
				types: any[];
				gl2: boolean;
			};
		};
		export const DATA_FORMAT_CHANNELS: {
			[x: number]: number;
		};
		export const TYPE_SIZES: {
			[x: number]: number;
		};
		export function isFormatSupported(gl: WebGLRenderingContext, format: any): any;
		export function isLinearFilteringSupported(gl: WebGLRenderingContext, format: any): any;
	}
	declare module "@luma.gl/webgl/utils/load-file" {
		export function setPathPrefix(prefix: any): void;
		export function loadFile(url: any, options?: {}): Promise<any>;
		export function loadImage(url: any, opts: any): Promise<unknown>;
	}

	declare module "@luma.gl/webgl/classes/renderbuffer-formats" {
		const _default: {
			[x: number]:
			| {
				bpp: number;
				gl2?: undefined;
			}
			| {
				gl2: boolean;
				bpp: number;
			}
			| {
				gl2: string;
				bpp: number;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/classes/renderbuffer" {
		import Resource from "@luma.gl/webgl/classes/resource";
		export default class Renderbuffer extends Resource {
			static isSupported(
				gl: WebGLRenderingContext,
				{
					format,
				}?: {
					format: any;
				}
			): any;
			static getSamplesForFormat(
				gl: WebGLRenderingContext,
				{
					format,
				}: {
					format: any;
				}
			): any;
			constructor(gl: WebGLRenderingContext, opts?: {});
			initialize({
				format,
				width,
				height,
				samples,
			}: {
				format: any;
				width?: number;
				height?: number;
				samples?: number;
			}): this;
			resize({ width, height }: { width: any; height: any }): this;
			_createHandle(): any;
			_deleteHandle(): void;
			_bindHandle(handle: any): void;
			_syncHandle(handle: any): void;
			_getParameter(pname: any): any;
		}
	}
	declare module "@luma.gl/webgl/classes/clear" {
		export function clear(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				color,
				depth,
				stencil,
			}?: {
				framebuffer?: any;
				color?: any;
				depth?: any;
				stencil?: any;
			}
		): void;
		export function clearBuffer(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				buffer,
				drawBuffer,
				value,
			}?: {
				framebuffer?: any;
				buffer?: number;
				drawBuffer?: number;
				value?: number[];
			}
		): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/format-utils" {
		export function glFormatToComponents(format: any): 1 | 0 | 2 | 4 | 3;
		export function glTypeToBytes(type: any): 1 | 0 | 2 | 4;
	}
	declare module "@luma.gl/webgl/classes/copy-and-blit" {
		export function readPixelsToArray(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				sourceAttachment, // TODO - support gl.readBuffer
				target,
				sourceWidth,
				sourceHeight,
				sourceType,
			}?: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				sourceAttachment?: any;
				target?: any;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function readPixelsToBuffer(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				target, // A new Buffer object is created when not provided.
				targetByteOffset, // byte offset in buffer object
				sourceWidth,
				sourceHeight,
				sourceType,
			}: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				target?: any;
				targetByteOffset?: number;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function copyToDataUrl(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetMaxHeight,
			}?: {
				sourceAttachment?: any;
				targetMaxHeight?: number;
			}
		): string;
		export function copyToImage(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetImage,
			}?: {
				sourceAttachment?: any;
				targetImage?: any;
			}
		): any;
		export function copyToTexture(
			source: any,
			target: any,
			{
				sourceX,
				sourceY,
				targetX,
				targetY,
				targetZ,
				targetMipmaplevel,
				targetInternalFormat,
				width, // defaults to target width
				height,
			}?: {
				sourceX?: number;
				sourceY?: number;
				targetX: any;
				targetY: any;
				targetZ: any;
				targetMipmaplevel?: number;
				targetInternalFormat?: any;
				width: any;
				height: any;
			}
		): any;
		export function blit(
			source: any,
			target: any,
			{
				sourceAttachment,
				sourceX0,
				sourceY0,
				sourceX1,
				sourceY1,
				targetX0,
				targetY0,
				targetX1,
				targetY1,
				color,
				depth,
				stencil,
				mask,
				filter,
			}?: {
				sourceAttachment?: any;
				sourceX0?: number;
				sourceY0?: number;
				sourceX1: any;
				sourceY1: any;
				targetX0?: number;
				targetY0?: number;
				targetX1: any;
				targetY1: any;
				color?: boolean;
				depth?: boolean;
				stencil?: boolean;
				mask?: number;
				filter?: any;
			}
		): any;
	}
	declare module "@luma.gl/webgl/features/webgl-limits-table" {
		const _default: {
			[x: number]:
			| {
				gl1: Float32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: Int32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative: boolean;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/limits" {
		export function getContextLimits(gl: WebGLRenderingContext): any;
		export function getGLContextInfo(gl: WebGLRenderingContext): any;
		export function getContextInfo(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/webgl-features-table" {
		export const FEATURES: {
			WEBGL2: string;
			VERTEX_ARRAY_OBJECT: string;
			TIMER_QUERY: string;
			INSTANCED_RENDERING: string;
			MULTIPLE_RENDER_TARGETS: string;
			ELEMENT_INDEX_UINT32: string;
			BLEND_EQUATION_MINMAX: string;
			FLOAT_BLEND: string;
			COLOR_ENCODING_SRGB: string;
			TEXTURE_DEPTH: string;
			TEXTURE_FLOAT: string;
			TEXTURE_HALF_FLOAT: string;
			TEXTURE_FILTER_LINEAR_FLOAT: string;
			TEXTURE_FILTER_LINEAR_HALF_FLOAT: string;
			TEXTURE_FILTER_ANISOTROPIC: string;
			COLOR_ATTACHMENT_RGBA32F: string;
			COLOR_ATTACHMENT_FLOAT: string;
			COLOR_ATTACHMENT_HALF_FLOAT: string;
			GLSL_FRAG_DATA: string;
			GLSL_FRAG_DEPTH: string;
			GLSL_DERIVATIVES: string;
			GLSL_TEXTURE_LOD: string;
		};
		function checkFloat32ColorAttachment(gl: WebGLRenderingContext): boolean;
		const _default: {
			[x: string]:
			| (string | boolean)[]
			| (string | typeof checkFloat32ColorAttachment)[];
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/features" {
		export function hasFeature(gl: WebGLRenderingContext, feature: any): any;
		export function hasFeatures(gl: WebGLRenderingContext, features: any): any;
		export function getFeatures(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/check-old-ie" {
		export default function isOldIE(opts?: {}): boolean;
	}
	declare module "@luma.gl/webgl/features/check-glsl-extension" {
		export default function canCompileGLGSExtension(
			gl: WebGLRenderingContext,
			cap: any,
			options?: {}
		): any;
	}
	declare module "features" {
		export {
			getContextInfo,
			getGLContextInfo,
			getContextLimits,
		} from "@luma.gl/webgl/features/limits";
		export { FEATURES } from "@luma.gl/webgl/features/webgl-features-table";
		export {
			hasFeature,
			hasFeatures,
			getFeatures,
		} from "@luma.gl/webgl/features/features";
		export { default as canCompileGLGSExtension } from "@luma.gl/webgl/features/check-glsl-extension";
	}

	declare module "@luma.gl/webgl/webgl-utils/texture-utils" {
		import Framebuffer from "@luma.gl/webgl/classes/framebuffer";
		export function cloneTextureFrom(refTexture: any, overrides: any): any;
		export function toFramebuffer(texture: any, opts: any): Framebuffer;
	}

	export default function getShaderName(shader: any, defaultName?: string): any;
	export default function getShaderTypeName(
		type: any
	): "fragment" | "vertex" | "unknown type";
	export default function getShaderVersion(source: any): number;

	declare module "@luma.gl/webgl/classes/uniforms" {
		export function parseUniformName(
			name: any
		): {
			name: any;
			length: any;
			isArray: boolean;
		};
		export function getUniformSetter(gl: WebGLRenderingContext, location: any, info: any): any;
		export function checkUniformValues(
			uniforms: any,
			source: any,
			uniformMap: any
		): boolean;
		/**
		 * Creates a copy of the uniform
		 *
		export function copyUniform(uniforms: any, key: any, value: any): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/attribute-utils" {
		export function getPrimitiveDrawMode(drawMode: any): 1 | 0 | 4;
		export function getPrimitiveCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function getVertexCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function decomposeCompositeGLType(
			compositeGLType: any
		): {
			type: any;
			components: any;
		};
		export function getCompositeGLType(
			type: any,
			components: any
		): {
			glType: string;
			name: any;
		};
	}
	declare module "@luma.gl/webgl/utils/array-utils-flat" {
		export function getScratchArrayBuffer(byteLength: any): any;
		export function getScratchArray(Type: any, length: any): any;
		export function fillArray({
			target,
			source,
			start,
			count,
		}: {
			target: any;
			source: any;
			start?: number;
			count?: number;
		}): any;
	}
	declare module "@luma.gl/webgl/classes/vertex-array-object" {
	}
	*/

	// luma.gl Base WebGL wrapper library
	// Provides simple class/function wrappers around the low level webgl objects
	// These classes are intentionally close to the WebGL API
	// but make it easier to use.
	// Higher level abstractions can be built on these classes

	// Initialize any global state
	export {lumaStats} from './init';

	// UTILS
	export {requestAnimationFrame, cancelAnimationFrame} from './webgl-utils/request-animation-frame';

	// WebGL Functions
	export {cloneTextureFrom} from './webgl-utils/texture-utils';
	export {getKeyValue, getKey} from './webgl-utils/constants-to-keys';
	export {getContextInfo, getGLContextInfo, getContextLimits} from './features/limits';
	export {FEATURES} from './features/webgl-features-table';
	export {hasFeature, hasFeatures, getFeatures} from './features/features';
	export {default as canCompileGLGSExtension} from './features/check-glsl-extension';

	// WebGL Helper Classes
	export {default as Accessor} from './classes/accessor';

	// WebGL1 classes
	export {default as Buffer} from './classes/buffer';
	export {Shader, VertexShader, FragmentShader} from './classes/shader';
	export {default as Program} from './classes/program';
	export {default as Framebuffer} from './classes/framebuffer';
	export {default as Renderbuffer} from './classes/renderbuffer';
	export {default as Texture2D} from './classes/texture-2d';
	export {default as TextureCube} from './classes/texture-cube';

	export {clear, clearBuffer} from './classes/clear';

	// Copy and Blit
	export {
	  readPixelsToArray,
	  readPixelsToBuffer,
	  copyToDataUrl,
	  copyToImage,
	  copyToTexture,
	  blit
	} from './classes/copy-and-blit';

	// WebGL2 classes & Extensions
	export {default as Query} from './classes/query';
	export {default as Texture3D} from './classes/texture-3d';
	export {default as TransformFeedback} from './classes/transform-feedback';
	export {default as VertexArrayObject} from './classes/vertex-array-object';
	export {default as VertexArray} from './classes/vertex-array';
	export {default as UniformBufferLayout} from './classes/uniform-buffer-layout';

	// experimental WebGL exports

	export {setPathPrefix, loadFile, loadImage} from './utils/load-file';

	// PARSE SHADER SOURCE
	export {default as getShaderName} from './glsl-utils/get-shader-name';
	export {default as getShaderVersion} from './glsl-utils/get-shader-version';

	// UTILS
	export {log} from '@luma.gl/gltools';
	export {default as assert} from './utils/assert';
	export {uid, isObjectEmpty} from './utils/utils';

	// INTERNAL
	export {parseUniformName, getUniformSetter} from './classes/uniforms';
	export {getDebugTableForUniforms} from './debug/debug-uniforms';
	export {getDebugTableForVertexArray} from './debug/debug-vertex-array';
	export {getDebugTableForProgramConfiguration} from './debug/debug-program-configuration';

}
declare module '@luma.gl/webgl/dist/es6/classes/texture-2d-array' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts: any): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	}

}
declare module '@luma.gl/webgl/dist/es6/classes/texture3d' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture3D extends Texture {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  setImageData(options: {
	    level?: number;
	    dataFormat?: any;
	    width: any;
	    height: any;
	    depth?: number;
	    border?: number;
	    format: any;
	    type?: any;
	    offset?: number;
	    data: any;
	    parameters?: {};
	  }): this;
	}

}
declare module '@luma.gl/webgl/dist/es6/glsl-utils/format-glsl-error' {
	export default function formatGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any
	): string;

	/**
	 * Parse a GLSL compiler error log into a string showing the source code around each error.
	 * Based on https://github.com/wwwtyro/gl-format-compiler-error (public domain)
	 */
	export function parseGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any,
	  shaderName: any
	): {
	  shaderName: string;
	  errors: string;
	  warnings: string;
	};

}
declare module '@luma.gl/webgl/dist/es6/utils/is-old-ie' {
	export default function isOldIE(opts?: {}): boolean;

}
declare module '@luma.gl/webgl/dist/es6/webgl-utils/typed-array-utils' {
	type TypedArrayConstructor =
	  Float32ArrayConstructor
	  | Uint16ArrayConstructor
	  | Uint32ArrayConstructor
	  | Uint8ArrayConstructor
	  | Uint8ClampedArrayConstructor
	  | Int8ArrayConstructor
	  | Int16ArrayConstructor
	  | Int32ArrayConstructor;

	export function getGLTypeFromTypedArray(arrayOrType: any): any;

	export function getTypedArrayFromGLType(glType: any, options?: {
	  clamped?: boolean;
	}): TypedArrayConstructor;

	export function flipRows(options: {
	  data: any;
	  width: any;
	  height: any;
	  bytesPerPixel?: number;
	  temp: any;
	}): void;

	export function scalePixels(options: {
	  data: any;
	  width: any;
	  height: any;
	}): {
	  data: Uint8Array;
	  width: number;
	  height: number;
	};

}
declare module '@luma.gl/webgl/dist/esm/init' {
	
	export class StatsManager {
	  constructor();
	  get(name: any): any;
	}

	export const lumaStats: StatsManager; const _default: any;
	export default _default;
}
declare module '@luma.gl/webgl/dist/esm/webgl-utils/request-animation-frame' {
		/// <reference types="@types/node" />
		export function requestAnimationFrame(callback: any): number | NodeJS.Timeout;
		export function cancelAnimationFrame(timerId: any): void;

}
declare module '@luma.gl/webgl/dist/esm/classes/accessor' {
	export default class Accessor {
	  static getBytesPerElement(accessor: any): number;
	  static getBytesPerVertex(accessor: any): number;
	  static resolve(...accessors: any[]): Accessor;
	  constructor(...accessors: any[]);
	  toString(): string;
	  get BYTES_PER_ELEMENT(): number;
	  get BYTES_PER_VERTEX(): number;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/resource' {
	export default class Resource {
	  readonly gl: WebGLRenderingContext;

	  constructor(gl: WebGLRenderingContext, opts?: {});
	  toString(): string;
	  get handle(): any;
	  delete({ deleteChildren }?: { deleteChildren?: boolean }): this;
	  bind(funcOrHandle?: any): any;
	  unbind(): void;
	  /**
	   * Query a Resource parameter
	   *
	   * @param {GLenum} pname
	   * @return {GLint|GLfloat|GLenum} param
	   */
	  getParameter(pname: any, opts?: {}): any;
	  getParameters(opts?: {}): {};
	  /**
	   * Update a Resource setting
	   *
	   * @todo - cache parameter to avoid issuing WebGL calls?
	   *
	   * @param {GLenum} pname - parameter (GL constant, value or key)
	   * @param {GLint|GLfloat|GLenum} value
	   * @return {Resource} returns self to enable chaining
	   */
	  setParameter(pname: any, value: any): this;
	  setParameters(parameters: any): this;
	  stubRemovedMethods(className: any, version: any, methodNames: any): void;
	  initialize(opts: any): void;

	  _trackAllocatedMemory(bytes: number, name?: string): void
	  _trackDeallocatedMemory(name?: string): void
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/buffer' {
	import Resource from "./resource";

	export default class Buffer extends Resource {
	  readonly byteLength: number;
	  readonly bytesUsed: number;
	  readonly usage: number;
	  readonly accessor: object;

	  constructor(gl: WebGLRenderingContext, props?: {});
	  getElementCount(accessor?: any): number;
	  getVertexCount(accessor?: any): number;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setAccessor(accessor: any): this;
	  reallocate(byteLength: any): boolean;
	  setData(props: any): this;
	  subData(props: any): this;
	  copyData(options: {
	    sourceBuffer: any;
	    readOffset?: number;
	    writeOffset?: number;
	    size: any;
	  }): this;
	  getData(options?: {
	    dstData?: any;
	    srcByteOffset?: number;
	    dstOffset?: number;
	    length?: number;
	  }): any;
	  /**
	   * Binds a buffer to a given binding point (target).
	   *   GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER take an index, and optionally a range.
	   *   - GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER need an index to affect state
	   *   - GL.UNIFORM_BUFFER: `offset` must be aligned to GL.UNIFORM_BUFFER_OFFSET_ALIGNMENT.
	   *   - GL.UNIFORM_BUFFER: `size` must be a minimum of GL.UNIFORM_BLOCK_SIZE_DATA.
	   */
	  bind(options?: {
	    target?: any;
	    index?: any;
	    offset?: number;
	    size: any;
	  }): this;
	  unbind(options?: { target?: any; index?: any }): this;
	  getDebugData(): {
	    data: any;
	    changed: boolean;
	  };
	  invalidateDebugData(): void;
	  get type(): any;
	  get bytes(): any;
	  setByteLength(byteLength: any): boolean;
	  updateAccessor(opts: any): this;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/shader' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export class Shader extends Resource {
	  static getTypeName(
	    shaderType: any
	  ): "vertex-shader" | "fragment-shader" | "unknown";
	  constructor(gl: WebGLRenderingContext, props: object);
	  initialize(options: { source: string }): void;
	  getParameter(pname: any): any;
	  toString(): string;
	  getName(): any;
	  getSource(): any;
	  getTranslatedSource(): any;
	}

	export class VertexShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

	export class FragmentShader extends Shader {
	  constructor(gl: WebGLRenderingContext, props: any);
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/program-configuration' {
	export default class ProgramConfiguration {
	  constructor(program: any);
	  getAttributeInfo(locationOrName: any): any;
	  getAttributeLocation(locationOrName: any): any;
	  getAttributeAccessor(locationOrName: any): any;
	  getVaryingInfo(locationOrName: any): any;
	  getVaryingIndex(locationOrName: any): any;
	  getVaryingAccessor(locationOrName: any): any;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/program' {
	import Resource from "./resource";
	import ProgramConfiguration from './program-configuration';

	export default class Program extends Resource {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  delete(options?: {}): this;
	  setProps(props: any): this;
	  draw(options: {
	    logPriority?: any;
	    drawMode?: any;
	    vertexCount: any;
	    offset?: number;
	    start?: any;
	    end?: any;
	    isIndexed?: boolean;
	    indexType?: any;
	    instanceCount?: number;
	    isInstanced?: boolean;
	    vertexArray?: any;
	    transformFeedback?: any;
	    framebuffer?: any;
	    parameters?: {};
	    uniforms?: any;
	    samplers?: any;
	  }): boolean;
	  setUniforms(uniforms?: {}): this;
	  getActiveUniforms(uniformIndices: any, pname: any): any;
	  getUniformBlockIndex(blockName: any): any;
	  getActiveUniformBlockParameter(blockIndex: any, pname: any): any;
	  uniformBlockBinding(blockIndex: any, blockBinding: any): void;

	  // TEST
	  readonly configuration: ProgramConfiguration;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/framebuffer' {
	import Resource from "@luma.gl/webgl/classes/resource";
	export default class Framebuffer extends Resource {
	  readonly width: number;
	  readonly height: number;

	  static isSupported(
	    gl: WebGLRenderingContext,
	    options?: {
	      colorBufferFloat: any;
	      colorBufferHalfFloat: any;
	    }
	  ): boolean;
	  static getDefaultFramebuffer(gl: WebGLRenderingContext): any;
	  get MAX_COLOR_ATTACHMENTS(): any;
	  get MAX_DRAW_BUFFERS(): any;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  get color(): any;
	  get texture(): any;
	  get depth(): any;
	  get stencil(): any;
	  initialize(options?: {
	    width?: number;
	    height?: number;
	    attachments?: any;
	    color?: boolean;
	    depth?: boolean;
	    stencil?: boolean;
	    check?: boolean;
	    readBuffer: any;
	    drawBuffers: any;
	  }): void;
	  // @ts-ignore
	  delete(): void;
	  update(options?: {
	    attachments?: {};
	    readBuffer: any;
	    drawBuffers: any;
	    clearAttachments?: boolean;
	    resizeAttachments?: boolean;
	  }): this;
	  resize(options?: { width: any; height: any }): this;
	  attach(
	    attachments: any,
	    options?: {
	      clearAttachments?: boolean;
	      resizeAttachments?: boolean;
	    }
	  ): void;
	  checkStatus(): this;
	  getStatus(): any;
	  clear(options?: {
	    color?: any;
	    depth?: any;
	    stencil?: any;
	    drawBuffers?: any[];
	  }): this;
	  readPixels(opts?: {}): any;
	  readPixelsToBuffer(opts?: {}): any;
	  copyToDataUrl(opts?: {}): any;
	  copyToImage(opts?: {}): any;
	  copyToTexture(opts?: {}): any;
	  blit(opts?: {}): any;
	  invalidate(options: {
	    attachments?: any[];
	    x?: number;
	    y?: number;
	    width: any;
	    height: any;
	  }): this;
	  getAttachmentParameter(attachment: any, pname: any, keys: any): any;
	  getAttachmentParameters(attachment: any, keys: any, parameters?: any): {};
	  getParameters(keys?: boolean): {};
	  show(): this;
	  log(logLevel?: number, message?: string): this;
	  bind({ target }?: { target?: any }): this;
	  unbind({ target }?: { target?: any }): this;
	}

	export const FRAMEBUFFER_ATTACHMENT_PARAMETERS: any[];

}
declare module '@luma.gl/webgl/dist/esm/classes/texture' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Texture extends Resource {
		readonly width: number;
		readonly height: number;
		readonly depth: number;
		readonly target: any;

		static isSupported(gl: WebGLRenderingContext, options?: {
			format: any;
			linearFiltering: any;
		}): boolean;

		constructor(gl: WebGLRenderingContext, props: any);
		toString(): string;
		initialize(props?: {}): this | void;
		resize(options: {
			height: any;
			width: any;
			mipmaps?: boolean;
		}): this;
		generateMipmap(params?: {}): this;
		setImageData(options: any): this;

		/**
		 * Redefines an area of an existing texture
		 * Note: does not allocate storage
		 */
		setSubImageData(options: {
			target?: any;
			pixels?: any;
			data?: any;
			x?: number;
			y?: number;
			width?: any;
			height?: any;
			level?: number;
			format?: any;
			type?: any;
			dataFormat?: any;
			compressed?: boolean;
			offset?: number;
			border?: any;
			parameters?: {};
		}): void;

		/**
		 * Defines a two-dimensional texture image or cube-map texture image with
		 * pixels from the current framebuffer (rather than from client memory).
		 * (gl.copyTexImage2D wrapper)
		 *
		 * Note that binding a texture into a Framebuffer's color buffer and
		 * rendering can be faster.
		 */
		copyFramebuffer(opts?: {}): any;
		getActiveUnit(): number;
		bind(textureUnit?: any): any;
		unbind(textureUnit?: any): any;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/texture-2d' {
	import Texture from './texture';

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts?: object): boolean;

	  constructor(gl: WebGLRenderingContext, props?: object);
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/texture-cube' {
	
	import Texture from "@luma.gl/webgl/classes/texture";
	export default class TextureCube extends Texture {
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): void;
	  subImage(options: {
	    face: any;
	    data: any;
	    x?: number;
	    y?: number;
	    mipmapLevel?: number;
	  }): any;
	  setCubeMapImageData(options: {
	    width: any;
	    height: any;
	    pixels: any;
	    data: any;
	    border?: number;
	    format?: any;
	    type?: any;
	  }): Promise<void>;
	  setImageDataForFace(options: any): this;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/copy-and-blit' {
	import Buffer from './buffer';
	import Framebuffer from './framebuffer';
	import Texture from './texture';

	// NOTE: Slow requires roundtrip to GPU
	// Copies data from a Framebuffer or a Texture object into ArrayBuffer object.
	// App can provide targetPixelArray or have it auto allocated by this method
	// @returns {Uint8Array|Uint16Array|FloatArray} - pixel array,
	//  newly allocated by this method unless provided by app.
	export function readPixelsToArray(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    sourceAttachment?: number,
	    target?: Uint8Array | Uint16Array | Float32Array,
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Uint8Array | Uint16Array | Float32Array;

	// NOTE: doesn't wait for copy to be complete, it programs GPU to perform a DMA transffer.
	// Copies data from a Framebuffer or a Texture object into a Buffer object.
	export function readPixelsToBuffer(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,
	    sourceFormat?: number,
	    target?: Buffer, // A new Buffer object is created when not provided.
	    targetByteOffset?: number, // byte offset in buffer object
	    // following parameters are auto deduced if not provided
	    sourceWidth?: number,
	    sourceHeight?: number,
	    sourceType?: number
	  }
	): Buffer;

	// Reads pixels from a Framebuffer or Texture object to a dataUrl
	export function copyToDataUrl(
	  source,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetMaxHeight?: number
	  } 
	): string;

	// Reads pixels from a Framebuffer or Texture object into an HTML Image
	export function copyToImage(
	  source: Framebuffer | Texture,
	  options?: {
	    sourceAttachment?: number, // TODO - support gl.readBuffer
	    targetImage?: typeof Image
	  }
	): typeof Image;

	// Copy a rectangle from a Framebuffer or Texture object into a texture (at an offset)
	export function copyToTexture(
	  source: Framebuffer | Texture,
	  target: Texture,
	  options?: {
	    sourceX?: number,
	    sourceY?: number,

	    targetX?: number,
	    targetY?: number,
	    targetZ?: number,
	    targetMipmaplevel?: number,
	    targetInternalFormat?: number,

	    width?: number, // defaults to target width
	    height?: number // defaults to target height
	  }
	): Texture;

	// NOTE: WEBLG2 only
	// Copies a rectangle of pixels between Framebuffer or Texture objects
	// eslint-disable-next-line max-statements, complexity
	export function blit(
	  source,
	  target,
	  options: {
	    sourceAttachment?: number,
	    sourceX0?: number,
	    sourceY0?: number,
	    sourceX1?: number,
	    sourceY1?: number,
	    targetX0?: number,
	    targetY0?: number,
	    targetX1?: number,
	    targetY1?: number,
	    color?: boolean,
	    depth?: boolean,
	    stencil?: boolean,
	    mask?: number,
	    filter?: number
	  }
	): void;

}
declare module '@luma.gl/webgl/dist/esm/classes/query' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class Query extends Resource {
	  static isSupported(gl: WebGLRenderingContext, opts?: any[]): boolean;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  beginTimeElapsedQuery(): this;
	  beginOcclusionQuery({ conservative }?: { conservative?: boolean }): this;
	  beginTransformFeedbackQuery(): this;
	  begin(target: any): this;
	  end(): this;
	  isResultAvailable(): any;
	  isTimerDisjoint(): any;
	  getResult(): any;
	  getTimerMilliseconds(): number;
	  createPoll(limit?: number): any;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/transform-feedback' {
	import Resource from "@luma.gl/webgl/classes/resource";

	export default class TransformFeedback extends Resource {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  initialize(props?: {}): this;
	  setProps(props: any): void;
	  setBuffers(buffers?: {}): this;
	  setBuffer(locationOrName: any, bufferOrParams: any): this;
	  begin(primitiveMode?: any): this;
	  end(): this;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/vertex-array-object' {
	import Resource from "./resource";

	export default class VertexArrayObject extends Resource {
	  static isSupported(gl: WebGLRenderingContext, options?: {}): boolean;
	  static getDefaultArray(gl: WebGLRenderingContext): any;
	  static getMaxAttributes(gl: WebGLRenderingContext): any;
	  static setConstant(gl: WebGLRenderingContext, location: any, array: any): void;
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): this;
	  get MAX_ATTRIBUTES(): any;
	  initialize(props?: {}): this;
	  setProps(props: any): this;
	  setElementBuffer(elementBuffer?: any, opts?: {}): this;
	  setBuffer(location: any, buffer: any, accessor: any): this;
	  enable(location: any, enable?: boolean): this;
	  getConstantBuffer(elementCount: any, value: any, accessor: any): any;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/vertex-array' {
	import ProgramConfiguration from "./program-configuration";
	import VertexArrayObject from "./vertex-array-object";

	export default class VertexArray {
	  constructor(gl: WebGLRenderingContext, opts?: {});
	  delete(): void;
	  initialize(props?: {}): this;
	  reset(): this;
	  setProps(props: any): this;
	  clearDrawParams(): void;
	  getDrawParams(): any;
	  setAttributes(attributes: any): this;
	  setElementBuffer(elementBuffer?: any, accessor?: {}): this;
	  setBuffer(locationOrName: any, buffer: any, appAccessor?: {}): this;
	  setConstant(locationOrName: any, arrayValue: any, appAccessor?: {}): this;
	  unbindBuffers(): this;
	  bindBuffers(): this;
	  bindForDraw(vertexCount: any, instanceCount: any, func: any): any;
	  setElements(elementBuffer?: any, accessor?: {}): this;

	  // FOR TESTING
	  readonly configuration: ProgramConfiguration | null;
	  readonly accessors: {size?: number}[];
	  readonly vertexArrayObject: VertexArrayObject;
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/uniform-buffer-layout' {
	/**
	 * Std140 layout for uniforms
	 */
	export default class UniformBufferLayout {
	  constructor(layout: any);
	  getBytes(): number;
	  getData(): any;
	  getSubData(
	    index: any
	  ): {
	    data: any;
	    offset: any;
	  };
	  setUniforms(values: any): this;
	  _setValue(key: any, value: any): void;
	  _addUniform(key: any, uniformType: any): void;
	  _alignTo(size: any, count: any): any;
	}

}
declare module '@luma.gl/webgl/dist/esm/utils/assert' {
	export default function assert(condition: any, message?: string): void;

}
declare module '@luma.gl/webgl/dist/esm/utils/utils' {
	/**
	 * Returns a UID.
	 * @param {String} id= - Identifier base name
	 * @return {number} uid
	 **/
	export function uid(id?: string): string;
	/**
	 * Verifies if a given number is power of two or not.
	 * @param {object} n - The number to check.
	 * @return {Array} Returns true if the given number is power of 2, false otherwise.
	 **/
	export function isPowerOfTwo(n: any): boolean;
	export function isObjectEmpty(obj: any): boolean;

}
declare module '@luma.gl/webgl/dist/esm/debug/debug-uniforms' {
	export function getDebugTableForUniforms(options?: {
	  header?: string;
	  program: any;
	  uniforms: any;
	  undefinedOnly?: boolean;
	}): {
	  table: {};
	  count: number;
	  unusedTable: {};
	  unusedCount: number;
	};

}
declare module '@luma.gl/webgl/dist/esm/debug/debug-vertex-array' {
	export function getDebugTableForVertexArray(options?: {
	  vertexArray: any;
	  header?: string;
	}): {};


}
declare module '@luma.gl/webgl/dist/esm/debug/debug-program-configuration' {
	export function getDebugTableForProgramConfiguration(
	  config: any
	): {};

}
declare module 'dist/esm' {
	/*
	declare module "@luma.gl/webgl/classes/texture-formats" {
		export const TEXTURE_FORMATS: {
			[x: number]:
			| {
				dataFormat: any;
				types: any[];
				gl2?: undefined;
			}
			| {
				dataFormat: any;
				types: any[];
				gl2: boolean;
			};
		};
		export const DATA_FORMAT_CHANNELS: {
			[x: number]: number;
		};
		export const TYPE_SIZES: {
			[x: number]: number;
		};
		export function isFormatSupported(gl: WebGLRenderingContext, format: any): any;
		export function isLinearFilteringSupported(gl: WebGLRenderingContext, format: any): any;
	}
	declare module "@luma.gl/webgl/utils/load-file" {
		export function setPathPrefix(prefix: any): void;
		export function loadFile(url: any, options?: {}): Promise<any>;
		export function loadImage(url: any, opts: any): Promise<unknown>;
	}

	declare module "@luma.gl/webgl/classes/renderbuffer-formats" {
		const _default: {
			[x: number]:
			| {
				bpp: number;
				gl2?: undefined;
			}
			| {
				gl2: boolean;
				bpp: number;
			}
			| {
				gl2: string;
				bpp: number;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/classes/renderbuffer" {
		import Resource from "@luma.gl/webgl/classes/resource";
		export default class Renderbuffer extends Resource {
			static isSupported(
				gl: WebGLRenderingContext,
				{
					format,
				}?: {
					format: any;
				}
			): any;
			static getSamplesForFormat(
				gl: WebGLRenderingContext,
				{
					format,
				}: {
					format: any;
				}
			): any;
			constructor(gl: WebGLRenderingContext, opts?: {});
			initialize({
				format,
				width,
				height,
				samples,
			}: {
				format: any;
				width?: number;
				height?: number;
				samples?: number;
			}): this;
			resize({ width, height }: { width: any; height: any }): this;
			_createHandle(): any;
			_deleteHandle(): void;
			_bindHandle(handle: any): void;
			_syncHandle(handle: any): void;
			_getParameter(pname: any): any;
		}
	}
	declare module "@luma.gl/webgl/classes/clear" {
		export function clear(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				color,
				depth,
				stencil,
			}?: {
				framebuffer?: any;
				color?: any;
				depth?: any;
				stencil?: any;
			}
		): void;
		export function clearBuffer(
			gl: WebGLRenderingContext,
			{
				framebuffer,
				buffer,
				drawBuffer,
				value,
			}?: {
				framebuffer?: any;
				buffer?: number;
				drawBuffer?: number;
				value?: number[];
			}
		): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/format-utils" {
		export function glFormatToComponents(format: any): 1 | 0 | 2 | 4 | 3;
		export function glTypeToBytes(type: any): 1 | 0 | 2 | 4;
	}
	declare module "@luma.gl/webgl/classes/copy-and-blit" {
		export function readPixelsToArray(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				sourceAttachment, // TODO - support gl.readBuffer
				target,
				sourceWidth,
				sourceHeight,
				sourceType,
			}?: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				sourceAttachment?: any;
				target?: any;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function readPixelsToBuffer(
			source: any,
			{
				sourceX,
				sourceY,
				sourceFormat,
				target, // A new Buffer object is created when not provided.
				targetByteOffset, // byte offset in buffer object
				sourceWidth,
				sourceHeight,
				sourceType,
			}: {
				sourceX?: number;
				sourceY?: number;
				sourceFormat?: any;
				target?: any;
				targetByteOffset?: number;
				sourceWidth: any;
				sourceHeight: any;
				sourceType: any;
			}
		): any;
		export function copyToDataUrl(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetMaxHeight,
			}?: {
				sourceAttachment?: any;
				targetMaxHeight?: number;
			}
		): string;
		export function copyToImage(
			source: any,
			{
				sourceAttachment, // TODO - support gl.readBuffer
				targetImage,
			}?: {
				sourceAttachment?: any;
				targetImage?: any;
			}
		): any;
		export function copyToTexture(
			source: any,
			target: any,
			{
				sourceX,
				sourceY,
				targetX,
				targetY,
				targetZ,
				targetMipmaplevel,
				targetInternalFormat,
				width, // defaults to target width
				height,
			}?: {
				sourceX?: number;
				sourceY?: number;
				targetX: any;
				targetY: any;
				targetZ: any;
				targetMipmaplevel?: number;
				targetInternalFormat?: any;
				width: any;
				height: any;
			}
		): any;
		export function blit(
			source: any,
			target: any,
			{
				sourceAttachment,
				sourceX0,
				sourceY0,
				sourceX1,
				sourceY1,
				targetX0,
				targetY0,
				targetX1,
				targetY1,
				color,
				depth,
				stencil,
				mask,
				filter,
			}?: {
				sourceAttachment?: any;
				sourceX0?: number;
				sourceY0?: number;
				sourceX1: any;
				sourceY1: any;
				targetX0?: number;
				targetY0?: number;
				targetX1: any;
				targetY1: any;
				color?: boolean;
				depth?: boolean;
				stencil?: boolean;
				mask?: number;
				filter?: any;
			}
		): any;
	}
	declare module "@luma.gl/webgl/features/webgl-limits-table" {
		const _default: {
			[x: number]:
			| {
				gl1: Float32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: Int32Array;
				gl2?: undefined;
				negative?: undefined;
			}
			| {
				gl1: number;
				gl2: number;
				negative: boolean;
			};
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/limits" {
		export function getContextLimits(gl: WebGLRenderingContext): any;
		export function getGLContextInfo(gl: WebGLRenderingContext): any;
		export function getContextInfo(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/webgl-features-table" {
		export const FEATURES: {
			WEBGL2: string;
			VERTEX_ARRAY_OBJECT: string;
			TIMER_QUERY: string;
			INSTANCED_RENDERING: string;
			MULTIPLE_RENDER_TARGETS: string;
			ELEMENT_INDEX_UINT32: string;
			BLEND_EQUATION_MINMAX: string;
			FLOAT_BLEND: string;
			COLOR_ENCODING_SRGB: string;
			TEXTURE_DEPTH: string;
			TEXTURE_FLOAT: string;
			TEXTURE_HALF_FLOAT: string;
			TEXTURE_FILTER_LINEAR_FLOAT: string;
			TEXTURE_FILTER_LINEAR_HALF_FLOAT: string;
			TEXTURE_FILTER_ANISOTROPIC: string;
			COLOR_ATTACHMENT_RGBA32F: string;
			COLOR_ATTACHMENT_FLOAT: string;
			COLOR_ATTACHMENT_HALF_FLOAT: string;
			GLSL_FRAG_DATA: string;
			GLSL_FRAG_DEPTH: string;
			GLSL_DERIVATIVES: string;
			GLSL_TEXTURE_LOD: string;
		};
		function checkFloat32ColorAttachment(gl: WebGLRenderingContext): boolean;
		const _default: {
			[x: string]:
			| (string | boolean)[]
			| (string | typeof checkFloat32ColorAttachment)[];
		};
		export default _default;
	}
	declare module "@luma.gl/webgl/features/features" {
		export function hasFeature(gl: WebGLRenderingContext, feature: any): any;
		export function hasFeatures(gl: WebGLRenderingContext, features: any): any;
		export function getFeatures(gl: WebGLRenderingContext): any;
	}
	declare module "@luma.gl/webgl/features/check-old-ie" {
		export default function isOldIE(opts?: {}): boolean;
	}
	declare module "@luma.gl/webgl/features/check-glsl-extension" {
		export default function canCompileGLGSExtension(
			gl: WebGLRenderingContext,
			cap: any,
			options?: {}
		): any;
	}
	declare module "features" {
		export {
			getContextInfo,
			getGLContextInfo,
			getContextLimits,
		} from "@luma.gl/webgl/features/limits";
		export { FEATURES } from "@luma.gl/webgl/features/webgl-features-table";
		export {
			hasFeature,
			hasFeatures,
			getFeatures,
		} from "@luma.gl/webgl/features/features";
		export { default as canCompileGLGSExtension } from "@luma.gl/webgl/features/check-glsl-extension";
	}

	declare module "@luma.gl/webgl/webgl-utils/texture-utils" {
		import Framebuffer from "@luma.gl/webgl/classes/framebuffer";
		export function cloneTextureFrom(refTexture: any, overrides: any): any;
		export function toFramebuffer(texture: any, opts: any): Framebuffer;
	}

	export default function getShaderName(shader: any, defaultName?: string): any;
	export default function getShaderTypeName(
		type: any
	): "fragment" | "vertex" | "unknown type";
	export default function getShaderVersion(source: any): number;

	declare module "@luma.gl/webgl/classes/uniforms" {
		export function parseUniformName(
			name: any
		): {
			name: any;
			length: any;
			isArray: boolean;
		};
		export function getUniformSetter(gl: WebGLRenderingContext, location: any, info: any): any;
		export function checkUniformValues(
			uniforms: any,
			source: any,
			uniformMap: any
		): boolean;
		/**
		 * Creates a copy of the uniform
		 *
		export function copyUniform(uniforms: any, key: any, value: any): void;
	}
	declare module "@luma.gl/webgl/webgl-utils/attribute-utils" {
		export function getPrimitiveDrawMode(drawMode: any): 1 | 0 | 4;
		export function getPrimitiveCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function getVertexCount({
			drawMode,
			vertexCount,
		}: {
			drawMode: any;
			vertexCount: any;
		}): any;
		export function decomposeCompositeGLType(
			compositeGLType: any
		): {
			type: any;
			components: any;
		};
		export function getCompositeGLType(
			type: any,
			components: any
		): {
			glType: string;
			name: any;
		};
	}
	declare module "@luma.gl/webgl/utils/array-utils-flat" {
		export function getScratchArrayBuffer(byteLength: any): any;
		export function getScratchArray(Type: any, length: any): any;
		export function fillArray({
			target,
			source,
			start,
			count,
		}: {
			target: any;
			source: any;
			start?: number;
			count?: number;
		}): any;
	}
	declare module "@luma.gl/webgl/classes/vertex-array-object" {
	}
	*/

	// luma.gl Base WebGL wrapper library
	// Provides simple class/function wrappers around the low level webgl objects
	// These classes are intentionally close to the WebGL API
	// but make it easier to use.
	// Higher level abstractions can be built on these classes

	// Initialize any global state
	export {lumaStats} from './init';

	// UTILS
	export {requestAnimationFrame, cancelAnimationFrame} from './webgl-utils/request-animation-frame';

	// WebGL Functions
	export {cloneTextureFrom} from './webgl-utils/texture-utils';
	export {getKeyValue, getKey} from './webgl-utils/constants-to-keys';
	export {getContextInfo, getGLContextInfo, getContextLimits} from './features/limits';
	export {FEATURES} from './features/webgl-features-table';
	export {hasFeature, hasFeatures, getFeatures} from './features/features';
	export {default as canCompileGLGSExtension} from './features/check-glsl-extension';

	// WebGL Helper Classes
	export {default as Accessor} from './classes/accessor';

	// WebGL1 classes
	export {default as Buffer} from './classes/buffer';
	export {Shader, VertexShader, FragmentShader} from './classes/shader';
	export {default as Program} from './classes/program';
	export {default as Framebuffer} from './classes/framebuffer';
	export {default as Renderbuffer} from './classes/renderbuffer';
	export {default as Texture2D} from './classes/texture-2d';
	export {default as TextureCube} from './classes/texture-cube';

	export {clear, clearBuffer} from './classes/clear';

	// Copy and Blit
	export {
	  readPixelsToArray,
	  readPixelsToBuffer,
	  copyToDataUrl,
	  copyToImage,
	  copyToTexture,
	  blit
	} from './classes/copy-and-blit';

	// WebGL2 classes & Extensions
	export {default as Query} from './classes/query';
	export {default as Texture3D} from './classes/texture-3d';
	export {default as TransformFeedback} from './classes/transform-feedback';
	export {default as VertexArrayObject} from './classes/vertex-array-object';
	export {default as VertexArray} from './classes/vertex-array';
	export {default as UniformBufferLayout} from './classes/uniform-buffer-layout';

	// experimental WebGL exports

	export {setPathPrefix, loadFile, loadImage} from './utils/load-file';

	// PARSE SHADER SOURCE
	export {default as getShaderName} from './glsl-utils/get-shader-name';
	export {default as getShaderVersion} from './glsl-utils/get-shader-version';

	// UTILS
	export {log} from '@luma.gl/gltools';
	export {default as assert} from './utils/assert';
	export {uid, isObjectEmpty} from './utils/utils';

	// INTERNAL
	export {parseUniformName, getUniformSetter} from './classes/uniforms';
	export {getDebugTableForUniforms} from './debug/debug-uniforms';
	export {getDebugTableForVertexArray} from './debug/debug-vertex-array';
	export {getDebugTableForProgramConfiguration} from './debug/debug-program-configuration';

}
declare module '@luma.gl/webgl/dist/esm/classes/texture-2d-array' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts: any): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	}

}
declare module '@luma.gl/webgl/dist/esm/classes/texture3d' {
	import Texture from "@luma.gl/webgl/classes/texture";

	export default class Texture3D extends Texture {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  setImageData(options: {
	    level?: number;
	    dataFormat?: any;
	    width: any;
	    height: any;
	    depth?: number;
	    border?: number;
	    format: any;
	    type?: any;
	    offset?: number;
	    data: any;
	    parameters?: {};
	  }): this;
	}

}
declare module '@luma.gl/webgl/dist/esm/glsl-utils/format-glsl-error' {
	export default function formatGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any
	): string;

	/**
	 * Parse a GLSL compiler error log into a string showing the source code around each error.
	 * Based on https://github.com/wwwtyro/gl-format-compiler-error (public domain)
	 */
	export function parseGLSLCompilerError(
	  errLog: any,
	  src: any,
	  shaderType: any,
	  shaderName: any
	): {
	  shaderName: string;
	  errors: string;
	  warnings: string;
	};

}
declare module '@luma.gl/webgl/dist/esm/utils/is-old-ie' {
	export default function isOldIE(opts?: {}): boolean;

}
declare module '@luma.gl/webgl/dist/esm/webgl-utils/typed-array-utils' {
	type TypedArrayConstructor =
	  Float32ArrayConstructor
	  | Uint16ArrayConstructor
	  | Uint32ArrayConstructor
	  | Uint8ArrayConstructor
	  | Uint8ClampedArrayConstructor
	  | Int8ArrayConstructor
	  | Int16ArrayConstructor
	  | Int32ArrayConstructor;

	export function getGLTypeFromTypedArray(arrayOrType: any): any;

	export function getTypedArrayFromGLType(glType: any, options?: {
	  clamped?: boolean;
	}): TypedArrayConstructor;

	export function flipRows(options: {
	  data: any;
	  width: any;
	  height: any;
	  bytesPerPixel?: number;
	  temp: any;
	}): void;

	export function scalePixels(options: {
	  data: any;
	  width: any;
	  height: any;
	}): {
	  data: Uint8Array;
	  width: number;
	  height: number;
	};

}
/// <reference types="@types/node" />
declare const moduleExports: any;
declare const _global: (Window & typeof globalThis) | (NodeJS.Global & typeof globalThis);
declare module '@luma.gl/webgl/init' {
	 class StatsManager {
	    constructor();
	    get(name: any): any;
	} const lumaStats: StatsManager;
	export { lumaStats }; const _default: any;
	export default _default;

}
declare module '@luma.gl/webgl/webgl-utils/request-animation-frame' {
	/// <reference types="@types/node" />
	export function requestAnimationFrame(callback: any): number | NodeJS.Timeout;
	export function cancelAnimationFrame(timerId: any): void;

}
declare module '@luma.gl/webgl/utils/assert' {
	export default function assert(condition: any, message: any): void;

}
declare module '@luma.gl/webgl/utils/is-old-ie' {
	export default function isOldIE(opts?: {}): boolean;

}
declare module '@luma.gl/webgl/utils/utils' {
	/**
	 * Returns a UID.
	 * @param {String} id= - Identifier base name
	 * @return {number} uid
	 **/
	export function uid(id?: string): string;
	/**
	 * Verifies if a given number is power of two or not.
	 * @param {object} n - The number to check.
	 * @return {Array} Returns true if the given number is power of 2, false otherwise.
	 **/
	export function isPowerOfTwo(n: any): boolean;
	export function isObjectEmpty(obj: any): boolean;

}
declare module '@luma.gl/webgl/utils/format-value' {
	export function formatValue(v: any, opts?: {}): any;

}
declare module '@luma.gl/webgl/utils/stub-methods' {
	export function stubRemovedMethods(instance: any, className: any, version: any, methodNames: any): void;

}
declare module '@luma.gl/webgl/utils/check-props' {
	export function checkProps(className: any, props: any, propChecks: any): any;

}
declare module 'utils' {
	export { default as assert } from '@luma.gl/webgl/utils/assert';
	export { default as isOldIE } from '@luma.gl/webgl/utils/is-old-ie';
	export { uid, isPowerOfTwo, isObjectEmpty } from '@luma.gl/webgl/utils/utils';
	export { formatValue } from '@luma.gl/webgl/utils/format-value';
	export { stubRemovedMethods } from '@luma.gl/webgl/utils/stub-methods';
	export { checkProps } from '@luma.gl/webgl/utils/check-props';

}
declare module '@luma.gl/webgl/webgl-utils/webgl-checks' {
	export const ERR_CONTEXT = "Invalid WebGLRenderingContext";
	export const ERR_WEBGL = "Invalid WebGLRenderingContext";
	export const ERR_WEBGL2 = "Requires WebGL2";
	export function assertWebGLContext(gl: any): void;
	export function assertWebGL2Context(gl: any): void;

}
declare module '@luma.gl/webgl/webgl-utils/typed-array-utils' {
	export function getGLTypeFromTypedArray(arrayOrType: any): number;
	export function getTypedArrayFromGLType(glType: any, { clamped }?: {
	    clamped?: boolean;
	}): Float32ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Int8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor;
	export function flipRows({ data, width, height, bytesPerPixel, temp }: {
	    data: any;
	    width: any;
	    height: any;
	    bytesPerPixel?: number;
	    temp: any;
	}): void;
	export function scalePixels({ data, width, height }: {
	    data: any;
	    width: any;
	    height: any;
	}): {
	    data: Uint8Array;
	    width: number;
	    height: number;
	};

}
declare module '@luma.gl/webgl/webgl-utils/constants-to-keys' {
	export function getKeyValue(gl: any, name: any): any;
	export function getKey(gl: any, value: any): string;
	export function getKeyType(gl: any, value: any): string;

}
declare module 'webgl-utils' {
	export { assertWebGLContext, assertWebGL2Context } from '@luma.gl/webgl/webgl-utils/webgl-checks';
	export { requestAnimationFrame, cancelAnimationFrame } from '@luma.gl/webgl/webgl-utils/request-animation-frame';
	export { getGLTypeFromTypedArray, getTypedArrayFromGLType, flipRows, scalePixels } from '@luma.gl/webgl/webgl-utils/typed-array-utils';
	export { getKeyValue, getKey, getKeyType } from '@luma.gl/webgl/webgl-utils/constants-to-keys';
	export { cloneTextureFrom } from '@luma.gl/webgl/webgl-utils/texture-utils';

}
declare module '@luma.gl/webgl/classes/resource' {
	export default class Resource {
	    constructor(gl: any, opts?: {});
	    toString(): string;
	    get handle(): any;
	    delete({ deleteChildren }?: {
	        deleteChildren?: boolean;
	    }): this;
	    bind(funcOrHandle?: any): any;
	    unbind(): void;
	    /**
	     * Query a Resource parameter
	     *
	     * @param {GLenum} pname
	     * @return {GLint|GLfloat|GLenum} param
	     */
	    getParameter(pname: any, opts?: {}): any;
	    getParameters(opts?: {}): {};
	    /**
	     * Update a Resource setting
	     *
	     * @todo - cache parameter to avoid issuing WebGL calls?
	     *
	     * @param {GLenum} pname - parameter (GL constant, value or key)
	     * @param {GLint|GLfloat|GLenum} value
	     * @return {Resource} returns self to enable chaining
	     */
	    setParameter(pname: any, value: any): this;
	    setParameters(parameters: any): this;
	    stubRemovedMethods(className: any, version: any, methodNames: any): void;
	    initialize(opts: any): void;
	    _createHandle(): void;
	    _deleteHandle(): void;
	    _bindHandle(): void;
	    _getOptsFromHandle(): void;
	    _getParameter(pname: any, opts: any): void;
	    /**
	     * @param {GLenum} pname
	     * @param {GLint|GLfloat|GLenum} param
	     * @return {Sampler} returns self to enable chaining
	     */
	    _setParameter(pname: any, value: any): void;
	    _context(): any;
	    _addStats(): void;
	    _removeStats(): void;
	    _trackAllocatedMemory(bytes: any, name?: string): void;
	    _trackDeallocatedMemory(name?: string): void;
	}

}
declare module '@luma.gl/webgl/classes/accessor' {
	 const DEFAULT_ACCESSOR_VALUES: {
	    offset: number;
	    stride: number;
	    type: number;
	    size: number;
	    divisor: number;
	    normalized: boolean;
	    integer: boolean;
	};
	export default class Accessor {
	    static getBytesPerElement(accessor: any): number;
	    static getBytesPerVertex(accessor: any): number;
	    static resolve(...accessors: any[]): Accessor;
	    constructor(...accessors: any[]);
	    toString(): string;
	    get BYTES_PER_ELEMENT(): number;
	    get BYTES_PER_VERTEX(): number;
	    _assign(props?: {}): this;
	}
	export { DEFAULT_ACCESSOR_VALUES };

}
declare module '@luma.gl/webgl/classes/buffer' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Buffer extends Resource {
	    constructor(gl: any, props?: {});
	    getElementCount(accessor?: any): number;
	    getVertexCount(accessor?: any): number;
	    initialize(props?: {}): this;
	    setProps(props: any): this;
	    setAccessor(accessor: any): this;
	    reallocate(byteLength: any): boolean;
	    setData(props: any): this;
	    subData(props: any): this;
	    copyData({ sourceBuffer, readOffset, writeOffset, size }: {
	        sourceBuffer: any;
	        readOffset?: number;
	        writeOffset?: number;
	        size: any;
	    }): this;
	    getData({ dstData, srcByteOffset, dstOffset, length }?: {
	        dstData?: any;
	        srcByteOffset?: number;
	        dstOffset?: number;
	        length?: number;
	    }): any;
	    /**
	     * Binds a buffer to a given binding point (target).
	     *   GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER take an index, and optionally a range.
	     *   - GL.TRANSFORM_FEEDBACK_BUFFER and GL.UNIFORM_BUFFER need an index to affect state
	     *   - GL.UNIFORM_BUFFER: `offset` must be aligned to GL.UNIFORM_BUFFER_OFFSET_ALIGNMENT.
	     *   - GL.UNIFORM_BUFFER: `size` must be a minimum of GL.UNIFORM_BLOCK_SIZE_DATA.
	     */
	    bind({ target, // target for the bind operation
	    index, // index = index of target (indexed bind point)
	    offset, size }?: {
	        target?: any;
	        index?: any;
	        offset?: number;
	        size: any;
	    }): this;
	    unbind({ target, index }?: {
	        target?: any;
	        index?: any;
	    }): this;
	    getDebugData(): {
	        data: any;
	        changed: boolean;
	    };
	    invalidateDebugData(): void;
	    _setData(data: any, offset?: number, byteLength?: any): this;
	    _setByteLength(byteLength: any, usage?: any): this;
	    _getTarget(): any;
	    _getAvailableElementCount(srcByteOffset: any): number;
	    _inferType(data: any): void;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _getParameter(pname: any): any;
	    get type(): any;
	    get bytes(): any;
	    setByteLength(byteLength: any): boolean;
	    updateAccessor(opts: any): this;
	}

}
declare module '@luma.gl/webgl/classes/texture-formats' {
	export const TEXTURE_FORMATS: {
	    [x: number]: {
	        dataFormat: number;
	        types: number[];
	        gl2?: undefined;
	    } | {
	        dataFormat: number;
	        types: number[];
	        gl2: boolean;
	    };
	};
	export const DATA_FORMAT_CHANNELS: {
	    [x: number]: number;
	};
	export const TYPE_SIZES: {
	    [x: number]: number;
	};
	export function isFormatSupported(gl: any, format: any): any;
	export function isLinearFilteringSupported(gl: any, format: any): any;

}
declare module '@luma.gl/webgl/classes/texture' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Texture extends Resource {
	    static isSupported(gl: any, { format, linearFiltering }?: {
	        format: any;
	        linearFiltering: any;
	    }): boolean;
	    constructor(gl: any, props: any);
	    toString(): string;
	    initialize(props?: {}): this;
	    resize({ height, width, mipmaps }: {
	        height: any;
	        width: any;
	        mipmaps?: boolean;
	    }): this;
	    generateMipmap(params?: {}): this;
	    setImageData(options: any): this;
	    /**
	     * Redefines an area of an existing texture
	     * Note: does not allocate storage
	     */
	    setSubImageData({ target, pixels, data, x, y, width, height, level, format, type, dataFormat, compressed, offset, border, parameters }: {
	        target?: any;
	        pixels?: any;
	        data?: any;
	        x?: number;
	        y?: number;
	        width?: any;
	        height?: any;
	        level?: number;
	        format?: any;
	        type?: any;
	        dataFormat?: any;
	        compressed?: boolean;
	        offset?: number;
	        border?: any;
	        parameters?: {};
	    }): void;
	    /**
	     * Defines a two-dimensional texture image or cube-map texture image with
	     * pixels from the current framebuffer (rather than from client memory).
	     * (gl.copyTexImage2D wrapper)
	     *
	     * Note that binding a texture into a Framebuffer's color buffer and
	     * rendering can be faster.
	     */
	    copyFramebuffer(opts?: {}): any;
	    getActiveUnit(): number;
	    bind(textureUnit?: any): any;
	    unbind(textureUnit?: any): any;
	    _getDataType({ data, compressed }: {
	        data: any;
	        compressed?: boolean;
	    }): {
	        data: any;
	        dataType: string;
	    };
	    _deduceParameters(opts: any): {
	        dataFormat: any;
	        type: any;
	        compressed: any;
	        width: any;
	        height: any;
	        format: any;
	        data: any;
	    };
	    _deduceImageSize(data: any, width: any, height: any): any;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _getParameter(pname: any): any;
	    _setParameter(pname: any, param: any): this;
	    _isNPOT(): boolean;
	    _updateForNPOT(parameters: any): void;
	    _getNPOTParam(pname: any, param: any): any;
	}

}
declare module '@luma.gl/webgl/utils/load-file' {
	export function setPathPrefix(prefix: any): void;
	export function loadFile(url: any, options?: {}): Promise<any>;
	export function loadImage(url: any, opts: any): Promise<unknown>;

}
declare module '@luma.gl/webgl/classes/texture-2d' {
	import Texture from '@luma.gl/webgl/classes/texture';
	export default class Texture2D extends Texture {
	    static isSupported(gl: any, opts: any): boolean;
	    constructor(gl: any, props?: {});
	}

}
declare module '@luma.gl/webgl/classes/texture-cube' {
	import Texture from '@luma.gl/webgl/classes/texture';
	export default class TextureCube extends Texture {
	    constructor(gl: any, props?: {});
	    initialize(props?: {}): void;
	    subImage({ face, data, x, y, mipmapLevel }: {
	        face: any;
	        data: any;
	        x?: number;
	        y?: number;
	        mipmapLevel?: number;
	    }): any;
	    setCubeMapImageData({ width, height, pixels, data, border, format, type }: {
	        width: any;
	        height: any;
	        pixels: any;
	        data: any;
	        border?: number;
	        format?: number;
	        type?: number;
	    }): Promise<void>;
	    setImageDataForFace(options: any): this;
	}

}
declare module '@luma.gl/webgl/classes/texture-3d' {
	import Texture from '@luma.gl/webgl/classes/texture';
	export default class Texture3D extends Texture {
	    static isSupported(gl: any): any;
	    constructor(gl: any, props?: {});
	    setImageData({ level, dataFormat, width, height, depth, border, format, type, offset, data, parameters }: {
	        level?: number;
	        dataFormat?: number;
	        width: any;
	        height: any;
	        depth?: number;
	        border?: number;
	        format: any;
	        type?: number;
	        offset?: number;
	        data: any;
	        parameters?: {};
	    }): this;
	}

}
declare module '@luma.gl/webgl/classes/renderbuffer-formats' {
	 const _default: {
	    [x: number]: {
	        bpp: number;
	        gl2?: undefined;
	    } | {
	        gl2: boolean;
	        bpp: number;
	    } | {
	        gl2: string;
	        bpp: number;
	    };
	};
	export default _default;

}
declare module '@luma.gl/webgl/classes/renderbuffer' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Renderbuffer extends Resource {
	    static isSupported(gl: any, { format }?: {
	        format: any;
	    }): any;
	    static getSamplesForFormat(gl: any, { format }: {
	        format: any;
	    }): any;
	    constructor(gl: any, opts?: {});
	    initialize({ format, width, height, samples }: {
	        format: any;
	        width?: number;
	        height?: number;
	        samples?: number;
	    }): this;
	    resize({ width, height }: {
	        width: any;
	        height: any;
	    }): this;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _bindHandle(handle: any): void;
	    _syncHandle(handle: any): void;
	    _getParameter(pname: any): any;
	}

}
declare module '@luma.gl/webgl/classes/clear' {
	export function clear(gl: any, { framebuffer, color, depth, stencil }?: {
	    framebuffer?: any;
	    color?: any;
	    depth?: any;
	    stencil?: any;
	}): void;
	export function clearBuffer(gl: any, { framebuffer, buffer, drawBuffer, value }?: {
	    framebuffer?: any;
	    buffer?: number;
	    drawBuffer?: number;
	    value?: number[];
	}): void;

}
declare module '@luma.gl/webgl/webgl-utils/format-utils' {
	export function glFormatToComponents(format: any): 1 | 0 | 2 | 4 | 3;
	export function glTypeToBytes(type: any): 1 | 0 | 2 | 4;

}
declare module '@luma.gl/webgl/classes/copy-and-blit' {
	import Framebuffer from '@luma.gl/webgl/classes/framebuffer';
	export function readPixelsToArray(source: any, { sourceX, sourceY, sourceFormat, sourceAttachment, // TODO - support gl.readBuffer
	target, sourceWidth, sourceHeight, sourceType }?: {
	    sourceX?: number;
	    sourceY?: number;
	    sourceFormat?: number;
	    sourceAttachment?: number;
	    target?: any;
	    sourceWidth: any;
	    sourceHeight: any;
	    sourceType: any;
	}): any;
	export function readPixelsToBuffer(source: any, { sourceX, sourceY, sourceFormat, target, // A new Buffer object is created when not provided.
	targetByteOffset, // byte offset in buffer object
	sourceWidth, sourceHeight, sourceType }: {
	    sourceX?: number;
	    sourceY?: number;
	    sourceFormat?: number;
	    target?: any;
	    targetByteOffset?: number;
	    sourceWidth: any;
	    sourceHeight: any;
	    sourceType: any;
	}): any;
	export function copyToDataUrl(source: any, { sourceAttachment, // TODO - support gl.readBuffer
	targetMaxHeight }?: {
	    sourceAttachment?: number;
	    targetMaxHeight?: number;
	}): string;
	export function copyToImage(source: any, { sourceAttachment, // TODO - support gl.readBuffer
	targetImage }?: {
	    sourceAttachment?: number;
	    targetImage?: any;
	}): any;
	export function copyToTexture(source: any, target: any, { sourceX, sourceY, targetX, targetY, targetZ, targetMipmaplevel, targetInternalFormat, width, // defaults to target width
	height }?: {
	    sourceX?: number;
	    sourceY?: number;
	    targetX: any;
	    targetY: any;
	    targetZ: any;
	    targetMipmaplevel?: number;
	    targetInternalFormat?: number;
	    width: any;
	    height: any;
	}): any;
	export function blit(source: any, target: any, { sourceAttachment, sourceX0, sourceY0, sourceX1, sourceY1, targetX0, targetY0, targetX1, targetY1, color, depth, stencil, mask, filter }?: {
	    sourceAttachment?: number;
	    sourceX0?: number;
	    sourceY0?: number;
	    sourceX1: any;
	    sourceY1: any;
	    targetX0?: number;
	    targetY0?: number;
	    targetX1: any;
	    targetY1: any;
	    color?: boolean;
	    depth?: boolean;
	    stencil?: boolean;
	    mask?: number;
	    filter?: number;
	}): Framebuffer;

}
declare module '@luma.gl/webgl/features/webgl-limits-table' {
	 const _default: {
	    [x: number]: {
	        gl1: Float32Array;
	        gl2?: undefined;
	        negative?: undefined;
	    } | {
	        gl1: number;
	        gl2: number;
	        negative?: undefined;
	    } | {
	        gl1: number;
	        gl2?: undefined;
	        negative?: undefined;
	    } | {
	        gl1: Int32Array;
	        gl2?: undefined;
	        negative?: undefined;
	    } | {
	        gl1: number;
	        gl2: number;
	        negative: boolean;
	    };
	};
	export default _default;

}
declare module '@luma.gl/webgl/features/limits' {
	export function getContextLimits(gl: any): any;
	export function getGLContextInfo(gl: any): any;
	export function getContextInfo(gl: any): any;

}
declare module '@luma.gl/webgl/features/webgl-features-table' {
	export const FEATURES: {
	    WEBGL2: string;
	    VERTEX_ARRAY_OBJECT: string;
	    TIMER_QUERY: string;
	    INSTANCED_RENDERING: string;
	    MULTIPLE_RENDER_TARGETS: string;
	    ELEMENT_INDEX_UINT32: string;
	    BLEND_EQUATION_MINMAX: string;
	    FLOAT_BLEND: string;
	    COLOR_ENCODING_SRGB: string;
	    TEXTURE_DEPTH: string;
	    TEXTURE_FLOAT: string;
	    TEXTURE_HALF_FLOAT: string;
	    TEXTURE_FILTER_LINEAR_FLOAT: string;
	    TEXTURE_FILTER_LINEAR_HALF_FLOAT: string;
	    TEXTURE_FILTER_ANISOTROPIC: string;
	    COLOR_ATTACHMENT_RGBA32F: string;
	    COLOR_ATTACHMENT_FLOAT: string;
	    COLOR_ATTACHMENT_HALF_FLOAT: string;
	    GLSL_FRAG_DATA: string;
	    GLSL_FRAG_DEPTH: string;
	    GLSL_DERIVATIVES: string;
	    GLSL_TEXTURE_LOD: string;
	}; function checkFloat32ColorAttachment(gl: any): boolean; const _default: {
	    [x: string]: (string | boolean)[] | (string | typeof checkFloat32ColorAttachment)[];
	};
	export default _default;

}
declare module '@luma.gl/webgl/features/features' {
	export function hasFeature(gl: any, feature: any): any;
	export function hasFeatures(gl: any, features: any): any;
	export function getFeatures(gl: any): any;

}
declare module '@luma.gl/webgl/features/check-old-ie' {
	export default function isOldIE(opts?: {}): boolean;

}
declare module '@luma.gl/webgl/features/check-glsl-extension' {
	export default function canCompileGLGSExtension(gl: any, cap: any, options?: {}): any;

}
declare module 'features' {
	export { getContextInfo, getGLContextInfo, getContextLimits } from '@luma.gl/webgl/features/limits';
	export { FEATURES } from '@luma.gl/webgl/features/webgl-features-table';
	export { hasFeature, hasFeatures, getFeatures } from '@luma.gl/webgl/features/features';
	export { default as canCompileGLGSExtension } from '@luma.gl/webgl/features/check-glsl-extension';

}
declare module '@luma.gl/webgl/classes/framebuffer' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Framebuffer extends Resource {
	    static isSupported(gl: any, { colorBufferFloat, // Whether floating point textures can be rendered and read
	    colorBufferHalfFloat }?: {
	        colorBufferFloat: any;
	        colorBufferHalfFloat: any;
	    }): boolean;
	    static getDefaultFramebuffer(gl: any): any;
	    get MAX_COLOR_ATTACHMENTS(): any;
	    get MAX_DRAW_BUFFERS(): any;
	    constructor(gl: any, opts?: {});
	    get color(): any;
	    get texture(): any;
	    get depth(): any;
	    get stencil(): any;
	    initialize({ width, height, attachments, color, depth, stencil, check, readBuffer, drawBuffers }: {
	        width?: number;
	        height?: number;
	        attachments?: any;
	        color?: boolean;
	        depth?: boolean;
	        stencil?: boolean;
	        check?: boolean;
	        readBuffer: any;
	        drawBuffers: any;
	    }): void;
	    delete(): void;
	    update({ attachments, readBuffer, drawBuffers, clearAttachments, resizeAttachments }: {
	        attachments?: {};
	        readBuffer: any;
	        drawBuffers: any;
	        clearAttachments?: boolean;
	        resizeAttachments?: boolean;
	    }): this;
	    resize({ width, height }?: {
	        width: any;
	        height: any;
	    }): this;
	    attach(attachments: any, { clearAttachments, resizeAttachments }?: {
	        clearAttachments?: boolean;
	        resizeAttachments?: boolean;
	    }): void;
	    checkStatus(): this;
	    getStatus(): any;
	    clear({ color, depth, stencil, drawBuffers }?: {
	        color: any;
	        depth: any;
	        stencil: any;
	        drawBuffers?: any[];
	    }): this;
	    readPixels(opts?: {}): any;
	    readPixelsToBuffer(opts?: {}): any;
	    copyToDataUrl(opts?: {}): any;
	    copyToImage(opts?: {}): any;
	    copyToTexture(opts?: {}): any;
	    blit(opts?: {}): any;
	    invalidate({ attachments, x, y, width, height }: {
	        attachments?: any[];
	        x?: number;
	        y?: number;
	        width: any;
	        height: any;
	    }): this;
	    getAttachmentParameter(attachment: any, pname: any, keys: any): number;
	    getAttachmentParameters(attachment: number, keys: any, parameters?: any): {};
	    getParameters(keys?: boolean): {};
	    show(): this;
	    log(logLevel?: number, message?: string): this;
	    bind({ target }?: {
	        target?: number;
	    }): this;
	    unbind({ target }?: {
	        target?: number;
	    }): this;
	    _createDefaultAttachments(color: any, depth: any, stencil: any, width: any, height: any): any;
	    _unattach(attachment: any): void;
	    _attachRenderbuffer({ attachment, renderbuffer }: {
	        attachment?: number;
	        renderbuffer: any;
	    }): void;
	    _attachTexture({ attachment, texture, layer, level }: {
	        attachment?: number;
	        texture: any;
	        layer: any;
	        level: any;
	    }): void;
	    _setReadBuffer(readBuffer: any): void;
	    _setDrawBuffers(drawBuffers: any): void;
	    _getAttachmentParameterFallback(pname: any): number;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _bindHandle(handle: any): any;
	}
	export const FRAMEBUFFER_ATTACHMENT_PARAMETERS: number[];

}
declare module '@luma.gl/webgl/webgl-utils/texture-utils' {
	import Framebuffer from '@luma.gl/webgl/classes/framebuffer';
	export function cloneTextureFrom(refTexture: any, overrides: any): any;
	export function toFramebuffer(texture: any, opts: any): Framebuffer;

}
declare module '@luma.gl/webgl/glsl-utils/get-shader-name' {
	export default function getShaderName(shader: any, defaultName?: string): any;

}
declare module '@luma.gl/webgl/glsl-utils/get-shader-type-name' {
	export default function getShaderTypeName(type: any): "fragment" | "vertex" | "unknown type";

}
declare module '@luma.gl/webgl/glsl-utils/format-glsl-error' {
	export default function formatGLSLCompilerError(errLog: any, src: any, shaderType: any): string;
	/**
	 * Parse a GLSL compiler error log into a string showing the source code around each error.
	 * Based on https://github.com/wwwtyro/gl-format-compiler-error (public domain)
	 */
	export function parseGLSLCompilerError(errLog: any, src: any, shaderType: any, shaderName: any): {
	    shaderName: string;
	    errors: string;
	    warnings: string;
	};

}
declare module '@luma.gl/webgl/glsl-utils/get-shader-version' {
	export default function getShaderVersion(source: any): number;

}
declare module 'glsl-utils' {
	export { default as formatGLSLCompilerError, parseGLSLCompilerError } from '@luma.gl/webgl/glsl-utils/format-glsl-error';
	export { default as getShaderName } from '@luma.gl/webgl/glsl-utils/get-shader-name';
	export { default as getShaderVersion } from '@luma.gl/webgl/glsl-utils/get-shader-version';
	export { default as getShaderTypeName } from '@luma.gl/webgl/glsl-utils/get-shader-type-name';

}
declare module '@luma.gl/webgl/classes/shader' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export class Shader extends Resource {
	    static getTypeName(shaderType: any): "vertex-shader" | "fragment-shader" | "unknown";
	    constructor(gl: any, props: any);
	    initialize({ source }: {
	        source: any;
	    }): void;
	    getParameter(pname: any): any;
	    toString(): string;
	    getName(): any;
	    getSource(): any;
	    getTranslatedSource(): any;
	    _compile(source?: any): void;
	    _deleteHandle(): void;
	    _getOptsFromHandle(): {
	        type: any;
	        source: any;
	    };
	}
	export class VertexShader extends Shader {
	    constructor(gl: any, props: any);
	    _createHandle(): any;
	}
	export class FragmentShader extends Shader {
	    constructor(gl: any, props: any);
	    _createHandle(): any;
	}

}
declare module '@luma.gl/webgl/classes/uniforms' {
	export function parseUniformName(name: any): {
	    name: any;
	    length: any;
	    isArray: boolean;
	};
	export function getUniformSetter(gl: any, location: any, info: any): any;
	export function checkUniformValues(uniforms: any, source: any, uniformMap: any): boolean;
	/**
	 * Creates a copy of the uniform
	 */
	export function copyUniform(uniforms: any, key: any, value: any): void;

}
declare module '@luma.gl/webgl/webgl-utils/attribute-utils' {
	export function getPrimitiveDrawMode(drawMode: any): 1 | 0 | 4;
	export function getPrimitiveCount({ drawMode, vertexCount }: {
	    drawMode: any;
	    vertexCount: any;
	}): any;
	export function getVertexCount({ drawMode, vertexCount }: {
	    drawMode: any;
	    vertexCount: any;
	}): any;
	export function decomposeCompositeGLType(compositeGLType: any): {
	    type: any;
	    components: any;
	};
	export function getCompositeGLType(type: any, components: any): {
	    glType: string;
	    name: any;
	};

}
declare module '@luma.gl/webgl/classes/program-configuration' {
	export default class ProgramConfiguration {
	    constructor(program: any);
	    getAttributeInfo(locationOrName: any): any;
	    getAttributeLocation(locationOrName: any): any;
	    getAttributeAccessor(locationOrName: any): any;
	    getVaryingInfo(locationOrName: any): any;
	    getVaryingIndex(locationOrName: any): any;
	    getVaryingAccessor(locationOrName: any): any;
	    _readAttributesFromProgram(program: any): void;
	    _readVaryingsFromProgram(program: any): void;
	    _addAttribute(location: any, name: any, compositeType: any, size: any): void;
	    _inferProperties(location: any, name: any, accessor: any): void;
	    _addVarying(location: any, name: any, compositeType: any, size: any): void;
	}

}
declare module '@luma.gl/webgl/classes/program' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Program extends Resource {
	    constructor(gl: any, props?: {});
	    initialize(props?: {}): this;
	    delete(options?: {}): this;
	    setProps(props: any): this;
	    draw({ logPriority, // Probe log priority, enables Model to do more integrated logging
	    drawMode, vertexCount, offset, start, end, isIndexed, indexType, instanceCount, isInstanced, vertexArray, transformFeedback, framebuffer, parameters, uniforms, samplers }: {
	        logPriority: any;
	        drawMode?: number;
	        vertexCount: any;
	        offset?: number;
	        start: any;
	        end: any;
	        isIndexed?: boolean;
	        indexType?: number;
	        instanceCount?: number;
	        isInstanced?: boolean;
	        vertexArray?: any;
	        transformFeedback: any;
	        framebuffer: any;
	        parameters?: {};
	        uniforms: any;
	        samplers: any;
	    }): boolean;
	    setUniforms(uniforms?: {}): this;
	    _areTexturesRenderable(): any;
	    _bindTextures(): void;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _getOptionsFromHandle(handle: any): {};
	    _getParameter(pname: any): any;
	    _setId(id: any): void;
	    _getName(): any;
	    _compileAndLink(): void;
	    _readUniformLocationsFromLinkedProgram(): void;
	    getActiveUniforms(uniformIndices: any, pname: any): any;
	    getUniformBlockIndex(blockName: any): any;
	    getActiveUniformBlockParameter(blockIndex: any, pname: any): any;
	    uniformBlockBinding(blockIndex: any, blockBinding: any): void;
	}

}
declare module '@luma.gl/webgl/classes/query' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class Query extends Resource {
	    static isSupported(gl: any, opts?: any[]): any;
	    constructor(gl: any, opts?: {});
	    beginTimeElapsedQuery(): this;
	    beginOcclusionQuery({ conservative }?: {
	        conservative?: boolean;
	    }): this;
	    beginTransformFeedbackQuery(): this;
	    begin(target: any): this;
	    end(): this;
	    isResultAvailable(): any;
	    isTimerDisjoint(): any;
	    getResult(): any;
	    getTimerMilliseconds(): number;
	    createPoll(limit?: number): any;
	    _createHandle(): any;
	    _deleteHandle(): void;
	}

}
declare module '@luma.gl/webgl/classes/transform-feedback' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class TransformFeedback extends Resource {
	    static isSupported(gl: any): any;
	    constructor(gl: any, props?: {});
	    initialize(props?: {}): this;
	    setProps(props: any): void;
	    setBuffers(buffers?: {}): this;
	    setBuffer(locationOrName: any, bufferOrParams: any): this;
	    begin(primitiveMode?: number): this;
	    end(): this;
	    _getBufferParams(bufferOrParams: any): {
	        buffer: any;
	        byteOffset: any;
	        byteSize: any;
	    };
	    _getVaryingInfo(locationOrName: any): any;
	    _getVaryingIndex(locationOrName: any): any;
	    _bindBuffers(): void;
	    _unbindBuffers(): void;
	    _bindBuffer(index: any, buffer: any, byteOffset: number, byteSize: any): this;
	    _createHandle(): any;
	    _deleteHandle(): void;
	    _bindHandle(handle: any): void;
	}

}
declare module '@luma.gl/webgl/utils/array-utils-flat' {
	export function getScratchArrayBuffer(byteLength: any): any;
	export function getScratchArray(Type: any, length: any): any;
	export function fillArray({ target, source, start, count }: {
	    target: any;
	    source: any;
	    start?: number;
	    count?: number;
	}): any;

}
declare module '@luma.gl/webgl/classes/vertex-array-object' {
	import Resource from '@luma.gl/webgl/classes/resource';
	export default class VertexArrayObject extends Resource {
	    static isSupported(gl: any, options?: {}): any;
	    static getDefaultArray(gl: any): any;
	    static getMaxAttributes(gl: any): any;
	    static setConstant(gl: any, location: any, array: any): void;
	    constructor(gl: any, opts?: {});
	    delete(): void;
	    get MAX_ATTRIBUTES(): any;
	    initialize(props?: {}): this;
	    setProps(props: any): this;
	    setElementBuffer(elementBuffer?: any, opts?: {}): this;
	    setBuffer(location: any, buffer: any, accessor: any): this;
	    enable(location: any, enable?: boolean): this;
	    getConstantBuffer(elementCount: any, value: any, accessor: any): any;
	    _normalizeConstantArrayValue(arrayValue: any, accessor: any): any;
	    _compareConstantArrayValues(v1: any, v2: any): boolean;
	    static _setConstantFloatArray(gl: any, location: any, array: any): void;
	    static _setConstantIntArray(gl: any, location: any, array: any): void;
	    static _setConstantUintArray(gl: any, location: any, array: any): void;
	    _createHandle(): any;
	    _deleteHandle(handle: any): any[];
	    _bindHandle(handle: any): void;
	    _getParameter(pname: any, { location }: {
	        location: any;
	    }): any;
	}

}
declare module '@luma.gl/webgl/classes/vertex-array' {
	import Accessor from '@luma.gl/webgl/classes/accessor';
	export default class VertexArray {
	    constructor(gl: any, opts?: {});
	    delete(): void;
	    initialize(props?: {}): this;
	    reset(): this;
	    setProps(props: any): this;
	    clearDrawParams(): void;
	    getDrawParams(): any;
	    setAttributes(attributes: any): this;
	    setElementBuffer(elementBuffer?: any, accessor?: {}): this;
	    setBuffer(locationOrName: any, buffer: any, appAccessor?: {}): this;
	    setConstant(locationOrName: any, arrayValue: any, appAccessor?: {}): this;
	    unbindBuffers(): this;
	    bindBuffers(): this;
	    bindForDraw(vertexCount: any, instanceCount: any, func: any): any;
	    _resolveLocationAndAccessor(locationOrName: any, value: any, valueAccessor: any, appAccessor: any): this | {
	        location: any;
	        accessor: Accessor;
	    };
	    _getAttributeInfo(attributeName: any): any;
	    _getAttributeIndex(locationOrName: any): {
	        location: number;
	        name?: undefined;
	    } | {
	        location: any;
	        name: any;
	    };
	    _setAttribute(locationOrName: any, value: any): void;
	    _setConstantAttributes(vertexCount: any, instanceCount: any): void;
	    _setConstantAttributeZero(constant: any, elementCount: any): void;
	    _setConstantAttribute(location: any, constant: any): void;
	    _updateDrawParams(): {
	        isIndexed: boolean;
	        isInstanced: boolean;
	        indexCount: number;
	        vertexCount: number;
	        instanceCount: number;
	    };
	    _updateDrawParamsForLocation(drawParams: any, location: any): void;
	    setElements(elementBuffer?: any, accessor?: {}): this;
	}

}
declare module '@luma.gl/webgl/classes/uniform-buffer-layout' {
	export default class UniformBufferLayout {
	    constructor(layout: any);
	    getBytes(): number;
	    getData(): any;
	    getSubData(index: any): {
	        data: any;
	        offset: any;
	    };
	    setUniforms(values: any): this;
	    _setValue(key: any, value: any): void;
	    _addUniform(key: any, uniformType: any): void;
	    _alignTo(size: any, count: any): any;
	}

}
declare module '@luma.gl/webgl/debug/debug-uniforms' {
	export function getDebugTableForUniforms({ header, program, uniforms, undefinedOnly }?: {
	    header?: string;
	    program: any;
	    uniforms: any;
	    undefinedOnly?: boolean;
	}): {
	    table: {};
	    count: number;
	    unusedTable: {};
	    unusedCount: number;
	};

}
declare module '@luma.gl/webgl/debug/debug-vertex-array' {
	export function getDebugTableForVertexArray({ vertexArray, header }?: {
	    vertexArray: any;
	    header?: string;
	}): {};

}
declare module '@luma.gl/webgl/debug/debug-program-configuration' {
	export function getDebugTableForProgramConfiguration(config: any): {};

}
declare module '@luma.gl/webgl' {
	export { lumaStats } from '@luma.gl/webgl/init';
	export { requestAnimationFrame, cancelAnimationFrame } from '@luma.gl/webgl/webgl-utils/request-animation-frame';
	export { cloneTextureFrom } from '@luma.gl/webgl/webgl-utils/texture-utils';
	export { getKeyValue, getKey } from '@luma.gl/webgl/webgl-utils/constants-to-keys';
	export { getContextInfo, getGLContextInfo, getContextLimits } from '@luma.gl/webgl/features/limits';
	export { FEATURES } from '@luma.gl/webgl/features/webgl-features-table';
	export { hasFeature, hasFeatures, getFeatures } from '@luma.gl/webgl/features/features';
	export { default as canCompileGLGSExtension } from '@luma.gl/webgl/features/check-glsl-extension';
	export { default as Accessor } from '@luma.gl/webgl/classes/accessor';
	export { default as Buffer } from '@luma.gl/webgl/classes/buffer';
	export { Shader, VertexShader, FragmentShader } from '@luma.gl/webgl/classes/shader';
	export { default as Program } from '@luma.gl/webgl/classes/program';
	export { default as Framebuffer } from '@luma.gl/webgl/classes/framebuffer';
	export { default as Renderbuffer } from '@luma.gl/webgl/classes/renderbuffer';
	export { default as Texture2D } from '@luma.gl/webgl/classes/texture-2d';
	export { default as TextureCube } from '@luma.gl/webgl/classes/texture-cube';
	export { clear, clearBuffer } from '@luma.gl/webgl/classes/clear';
	export { readPixelsToArray, readPixelsToBuffer, copyToDataUrl, copyToImage, copyToTexture, blit } from '@luma.gl/webgl/classes/copy-and-blit';
	export { default as Query } from '@luma.gl/webgl/classes/query';
	export { default as Texture3D } from '@luma.gl/webgl/classes/texture-3d';
	export { default as TransformFeedback } from '@luma.gl/webgl/classes/transform-feedback';
	export { default as VertexArrayObject } from '@luma.gl/webgl/classes/vertex-array-object';
	export { default as VertexArray } from '@luma.gl/webgl/classes/vertex-array';
	export { default as UniformBufferLayout } from '@luma.gl/webgl/classes/uniform-buffer-layout';
	export { setPathPrefix, loadFile, loadImage } from '@luma.gl/webgl/utils/load-file';
	export { default as getShaderName } from '@luma.gl/webgl/glsl-utils/get-shader-name';
	export { default as getShaderVersion } from '@luma.gl/webgl/glsl-utils/get-shader-version';
	export { log } from '@luma.gl/webgl/@luma.gl/gltools';
	export { default as assert } from '@luma.gl/webgl/utils/assert';
	export { uid, isObjectEmpty } from '@luma.gl/webgl/utils/utils';
	export { parseUniformName, getUniformSetter } from '@luma.gl/webgl/classes/uniforms';
	export { getDebugTableForUniforms } from '@luma.gl/webgl/debug/debug-uniforms';
	export { getDebugTableForVertexArray } from '@luma.gl/webgl/debug/debug-vertex-array';
	export { getDebugTableForProgramConfiguration } from '@luma.gl/webgl/debug/debug-program-configuration';

}
declare module '@luma.gl/webgl/src/classes/texture-2d-array' {
	import Texture from '@luma.gl/webgl/@luma.gl/webgl/classes/texture';

	export default class Texture2D extends Texture {
	  static isSupported(gl: WebGLRenderingContext, opts: any): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	}

}
declare module '@luma.gl/webgl/src/classes/texture3d' {
	import Texture from '@luma.gl/webgl/@luma.gl/webgl/classes/texture';

	export default class Texture3D extends Texture {
	  static isSupported(gl: WebGLRenderingContext): boolean;
	  constructor(gl: WebGLRenderingContext, props?: {});
	  setImageData(options: {
	    level?: number;
	    dataFormat?: any;
	    width: any;
	    height: any;
	    depth?: number;
	    border?: number;
	    format: any;
	    type?: any;
	    offset?: number;
	    data: any;
	    parameters?: {};
	  }): this;
	}

}
declare module '@luma.gl/webgl/webgl-utils/get-error' {
	export function glGetError(gl: any): Error;
	export function glCheckError(gl: any): void;

}
