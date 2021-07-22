//typings for @deck.gl/layers v8.3.14
declare module '@deck.gl/layers/arc-layer/arc-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME arc-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec4 instanceSourceColors;\nattribute vec4 instanceTargetColors;\nattribute vec3 instanceSourcePositions;\nattribute vec3 instanceSourcePositions64Low;\nattribute vec3 instanceTargetPositions;\nattribute vec3 instanceTargetPositions64Low;\nattribute vec3 instancePickingColors;\nattribute float instanceWidths;\nattribute float instanceHeights;\nattribute float instanceTilts;\n\nuniform bool greatCircle;\nuniform float numSegments;\nuniform float opacity;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\nvarying vec4 vColor;\nvarying vec2 uv;\nvarying float isValid;\n\nfloat paraboloid(float distance, float sourceZ, float targetZ, float ratio) {\n  // d: distance on the xy plane\n  // r: ratio of the current point\n  // p: ratio of the peak of the arc\n  // h: height multiplier\n  // z = f(r) = sqrt(r * (p * 2 - r)) * d * h\n  // f(0) = 0\n  // f(1) = dz\n\n  float deltaZ = targetZ - sourceZ;\n  float dh = distance * instanceHeights;\n  float unitZ = dh == 0.0 ? 0.0 : deltaZ / dh;\n  float p2 = unitZ * unitZ + 1.0;\n\n  // sqrt does not deal with negative values, manually flip source and target if delta.z < 0\n  float dir = step(deltaZ, 0.0);\n  float z0 = mix(sourceZ, targetZ, dir);\n  float r = mix(ratio, 1.0 - ratio, dir);\n  return sqrt(r * (p2 - r)) * dh + z0;\n}\n\n// offset vector by strokeWidth pixels\n// offset_direction is -1 (left) or 1 (right)\nvec2 getExtrusionOffset(vec2 line_clipspace, float offset_direction, float width) {\n  // normalized direction of the line\n  vec2 dir_screenspace = normalize(line_clipspace * project_uViewportSize);\n  // rotate by 90 degrees\n  dir_screenspace = vec2(-dir_screenspace.y, dir_screenspace.x);\n\n  return dir_screenspace * offset_direction * width / 2.0;\n}\n\nfloat getSegmentRatio(float index) {\n  return smoothstep(0.0, 1.0, index / (numSegments - 1.0));\n}\n\nvec3 interpolateFlat(vec3 source, vec3 target, float segmentRatio) {\n  float distance = length(source.xy - target.xy);\n  float z = paraboloid(distance, source.z, target.z, segmentRatio);\n\n  float tiltAngle = radians(instanceTilts);\n  vec2 tiltDirection = normalize(target.xy - source.xy);\n  vec2 tilt = vec2(-tiltDirection.y, tiltDirection.x) * z * sin(tiltAngle);\n\n  return vec3(\n    mix(source.xy, target.xy, segmentRatio) + tilt,\n    z * cos(tiltAngle)\n  );\n}\n\n/* Great circle interpolation\n * http://www.movable-type.co.uk/scripts/latlong.html\n */\nfloat getAngularDist (vec2 source, vec2 target) {\n  vec2 sourceRadians = radians(source);\n  vec2 targetRadians = radians(target);\n  vec2 sin_half_delta = sin((sourceRadians - targetRadians) / 2.0);\n  vec2 shd_sq = sin_half_delta * sin_half_delta;\n\n  float a = shd_sq.y + cos(sourceRadians.y) * cos(targetRadians.y) * shd_sq.x;\n  return 2.0 * asin(sqrt(a));\n}\n\nvec3 interpolateGreatCircle(vec3 source, vec3 target, vec3 source3D, vec3 target3D, float angularDist, float t) {\n  vec2 lngLat;\n\n  // if the angularDist is PI, linear interpolation is applied. otherwise, use spherical interpolation\n  if(abs(angularDist - PI) < 0.001) {\n    lngLat = (1.0 - t) * source.xy + t * target.xy;\n  } else {\n    float a = sin((1.0 - t) * angularDist);\n    float b = sin(t * angularDist);\n    vec3 p = source3D.yxz * a + target3D.yxz * b;\n    lngLat = degrees(vec2(atan(p.y, -p.x), atan(p.z, length(p.xy))));\n  }\n\n  float z = paraboloid(angularDist * EARTH_RADIUS, source.z, target.z, t);\n\n  return vec3(lngLat, z);\n}\n\n/* END GREAT CIRCLE */\n\nvoid main(void) {\n  geometry.worldPosition = instanceSourcePositions;\n  geometry.worldPositionAlt = instanceTargetPositions;\n\n  float segmentIndex = positions.x;\n  float segmentRatio = getSegmentRatio(segmentIndex);\n  // if it's the first point, use next - current as direction\n  // otherwise use current - prev\n  float indexDir = mix(-1.0, 1.0, step(segmentIndex, 0.0));\n  isValid = 1.0;\n\n  uv = vec2(segmentRatio, positions.y);\n  geometry.uv = uv;\n  geometry.pickingColor = instancePickingColors;\n\n  vec4 curr;\n  vec4 next;\n  vec3 source;\n  vec3 target;\n\n  if ((greatCircle || project_uProjectionMode == PROJECTION_MODE_GLOBE) && project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT) {\n    source = project_globe_(vec3(instanceSourcePositions.xy, 0.0));\n    target = project_globe_(vec3(instanceTargetPositions.xy, 0.0));\n    float angularDist = getAngularDist(instanceSourcePositions.xy, instanceTargetPositions.xy);\n  \n    float prevSegmentRatio = getSegmentRatio(max(0.0, segmentIndex - 1.0));\n    float nextSegmentRatio = getSegmentRatio(min(numSegments, segmentIndex + 1.0));\n\n    vec3 prevPos = interpolateGreatCircle(instanceSourcePositions, instanceTargetPositions, source, target, angularDist, prevSegmentRatio);\n    vec3 currPos = interpolateGreatCircle(instanceSourcePositions, instanceTargetPositions, source, target, angularDist, segmentRatio);\n    vec3 nextPos = interpolateGreatCircle(instanceSourcePositions, instanceTargetPositions, source, target, angularDist, nextSegmentRatio);\n\n    if (abs(currPos.x - prevPos.x) > 180.0) {\n      indexDir = -1.0;\n      isValid = 0.0;\n    } else if (abs(currPos.x - nextPos.x) > 180.0) {\n      indexDir = 1.0;\n      isValid = 0.0;\n    }\n    nextPos = indexDir < 0.0 ? prevPos : nextPos;\n    nextSegmentRatio = indexDir < 0.0 ? prevSegmentRatio : nextSegmentRatio;\n\n    if (isValid == 0.0) {\n      // split at the 180th meridian\n      nextPos.x += nextPos.x > 0.0 ? -360.0 : 360.0;\n      float t = ((currPos.x > 0.0 ? 180.0 : -180.0) - currPos.x) / (nextPos.x - currPos.x);\n      currPos = mix(currPos, nextPos, t);\n      segmentRatio = mix(segmentRatio, nextSegmentRatio, t);\n    }\n\n    vec3 currPos64Low = mix(instanceSourcePositions64Low, instanceTargetPositions64Low, segmentRatio);\n    vec3 nextPos64Low = mix(instanceSourcePositions64Low, instanceTargetPositions64Low, nextSegmentRatio);\n  \n    curr = project_position_to_clipspace(currPos, currPos64Low, vec3(0.0), geometry.position);\n    next = project_position_to_clipspace(nextPos, nextPos64Low, vec3(0.0));\n  \n  } else {\n    source = project_position(instanceSourcePositions, instanceSourcePositions64Low);\n    target = project_position(instanceTargetPositions, instanceTargetPositions64Low);\n\n    float nextSegmentRatio = getSegmentRatio(segmentIndex + indexDir);\n    vec3 currPos = interpolateFlat(source, target, segmentRatio);\n    vec3 nextPos = interpolateFlat(source, target, nextSegmentRatio);\n    curr = project_common_position_to_clipspace(vec4(currPos, 1.0));\n    next = project_common_position_to_clipspace(vec4(nextPos, 1.0));\n    geometry.position = vec4(currPos, 1.0);\n  }\n\n  // Multiply out width and clamp to limits\n  // mercator pixels are interpreted as screen pixels\n  float widthPixels = clamp(\n    project_size_to_pixel(instanceWidths * widthScale),\n    widthMinPixels, widthMaxPixels\n  );\n\n  // extrude\n  vec3 offset = vec3(\n    getExtrusionOffset((next.xy - curr.xy) * indexDir, positions.y, widthPixels),\n    0.0);\n  DECKGL_FILTER_SIZE(offset, geometry);\n  gl_Position = curr + vec4(project_pixel_size_to_clipspace(offset.xy), 0.0, 0.0);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vec4 color = mix(instanceSourceColors, instanceTargetColors, segmentRatio);\n  vColor = vec4(color.rgb, color.a * opacity);\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/arc-layer/arc-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME arc-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\nvarying vec2 uv;\nvarying float isValid;\n\nvoid main(void) {\n  if (isValid == 0.0) {\n    discard;\n  }\n\n  gl_FragColor = vColor;\n  geometry.uv = uv;\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/arc-layer/arc-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class ArcLayer extends Layer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	}

}
declare module '@deck.gl/layers/bitmap-layer/create-mesh' {
	export default function createMesh(bounds: any, resolution: any): {
	    vertexCount: number;
	    positions: Float64Array;
	    indices: Uint16Array;
	    texCoords: Float32Array;
	} | {
	    vertexCount: number;
	    positions: Float64Array;
	    indices: Uint32Array;
	    texCoords: Float32Array;
	};

}
declare module '@deck.gl/layers/bitmap-layer/bitmap-layer-vertex' {
	 const _default: "\n#define SHADER_NAME bitmap-layer-vertex-shader\n\nattribute vec2 texCoords;\nattribute vec3 positions;\nattribute vec3 positions64Low;\n\nvarying vec2 vTexCoord;\n\nconst vec3 pickingColor = vec3(1.0, 0.0, 0.0);\n\nvoid main(void) {\n  geometry.worldPosition = positions;\n  geometry.uv = texCoords;\n  geometry.pickingColor = pickingColor;\n\n  gl_Position = project_position_to_clipspace(positions, positions64Low, vec3(0.0), geometry.position);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vTexCoord = texCoords;\n\n  vec4 color = vec4(0.0);\n  DECKGL_FILTER_COLOR(color, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/bitmap-layer/bitmap-layer-fragment' {
	 const _default: "\n#define SHADER_NAME bitmap-layer-fragment-shader\n\n#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform sampler2D bitmapTexture;\n\nvarying vec2 vTexCoord;\n\nuniform float desaturate;\nuniform vec4 transparentColor;\nuniform vec3 tintColor;\nuniform float opacity;\n\n// apply desaturation\nvec3 color_desaturate(vec3 color) {\n  float luminance = (color.r + color.g + color.b) * 0.333333333;\n  return mix(color, vec3(luminance), desaturate);\n}\n\n// apply tint\nvec3 color_tint(vec3 color) {\n  return color * tintColor;\n}\n\n// blend with background color\nvec4 apply_opacity(vec3 color, float alpha) {\n  return mix(transparentColor, vec4(color, 1.0), alpha);\n}\n\nvoid main(void) {\n  vec4 bitmapColor = texture2D(bitmapTexture, vTexCoord);\n\n  gl_FragColor = apply_opacity(color_tint(color_desaturate(bitmapColor.rgb)), bitmapColor.a * opacity);\n\n  geometry.uv = vTexCoord;\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/bitmap-layer/bitmap-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class BitmapLayer extends Layer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    finalizeState(): void;
	    _createMesh(): {
	        vertexCount: number;
	        positions: Float64Array;
	        indices: Uint16Array;
	        texCoords: Float32Array;
	    } | {
	        vertexCount: number;
	        positions: Float64Array;
	        indices: Uint32Array;
	        texCoords: Float32Array;
	    };
	    _getModel(gl: any): any;
	    draw(opts: any): void;
	    loadTexture(image: any): void;
	}

}
declare module '@deck.gl/layers/icon-layer/icon-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME icon-layer-vertex-shader\n\nattribute vec2 positions;\n\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute float instanceSizes;\nattribute float instanceAngles;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\nattribute vec4 instanceIconFrames;\nattribute float instanceColorModes;\nattribute vec2 instanceOffsets;\nattribute vec2 instancePixelOffset;\n\nuniform float sizeScale;\nuniform vec2 iconsTextureDim;\nuniform float sizeMinPixels;\nuniform float sizeMaxPixels;\nuniform bool billboard;\n\nvarying float vColorMode;\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying vec2 uv;\n\nvec2 rotate_by_angle(vec2 vertex, float angle) {\n  float angle_radian = angle * PI / 180.0;\n  float cos_angle = cos(angle_radian);\n  float sin_angle = sin(angle_radian);\n  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);\n  return rotationMatrix * vertex;\n}\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n  geometry.uv = positions;\n  geometry.pickingColor = instancePickingColors;\n  uv = positions;\n\n  vec2 iconSize = instanceIconFrames.zw;\n  // convert size in meters to pixels, then scaled and clamp\n \n  // project meters to pixels and clamp to limits \n  float sizePixels = clamp(\n    project_size_to_pixel(instanceSizes * sizeScale), \n    sizeMinPixels, sizeMaxPixels\n  );\n\n  // scale icon height to match instanceSize\n  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;\n\n  // scale and rotate vertex in \"pixel\" value and convert back to fraction in clipspace\n  vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;\n  pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;\n  pixelOffset += instancePixelOffset;\n  pixelOffset.y *= -1.0;\n\n  if (billboard)  {\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);\n    vec3 offset = vec3(pixelOffset, 0.0);\n    DECKGL_FILTER_SIZE(offset, geometry);\n    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);\n\n  } else {\n    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);\n    DECKGL_FILTER_SIZE(offset_common, geometry);\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position); \n  }\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vTextureCoords = mix(\n    instanceIconFrames.xy,\n    instanceIconFrames.xy + iconSize,\n    (positions.xy + 1.0) / 2.0\n  ) / iconsTextureDim;\n\n  vColor = instanceColors;\n  DECKGL_FILTER_COLOR(vColor, geometry);\n\n  vColorMode = instanceColorModes;\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/icon-layer/icon-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME icon-layer-fragment-shader\n\nprecision highp float;\n\nuniform float opacity;\nuniform sampler2D iconsTexture;\nuniform float alphaCutoff;\n\nvarying float vColorMode;\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying vec2 uv;\n\nvoid main(void) {\n  geometry.uv = uv;\n\n  vec4 texColor = texture2D(iconsTexture, vTextureCoords);\n\n  // if colorMode == 0, use pixel color from the texture\n  // if colorMode == 1 or rendering picking buffer, use texture as transparency mask\n  vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);\n  // Take the global opacity and the alpha from vColor into account for the alpha component\n  float a = texColor.a * opacity * vColor.a;\n\n  if (a < alphaCutoff) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, a);\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/icon-layer/icon-manager' {
	/**
	 * Generate coordinate mapping to retrieve icon left-top position from an icon atlas
	 * @param icons {Array<Object>} list of icons, each icon requires url, width, height
	 * @param buffer {Number} add buffer to the right and bottom side of the image
	 * @param xOffset {Number} right position of last icon in old mapping
	 * @param yOffset {Number} top position in last icon in old mapping
	 * @param rowHeight {Number} rowHeight of the last icon's row
	 * @param canvasWidth {Number} max width of canvas
	 * @param mapping {object} old mapping
	 * @returns {{mapping: {'/icon/1': {url, width, height, ...}},, canvasHeight: {Number}}}
	 */
	export function buildMapping({ icons, buffer, mapping, xOffset, yOffset, rowHeight, canvasWidth }: {
	    icons: any;
	    buffer: any;
	    mapping?: {};
	    xOffset?: number;
	    yOffset?: number;
	    rowHeight?: number;
	    canvasWidth: any;
	}): {
	    mapping: {};
	    rowHeight: number;
	    xOffset: number;
	    yOffset: number;
	    canvasWidth: any;
	    canvasHeight: number;
	};
	export function getDiffIcons(data: any, getIcon: any, cachedIcons: any): {};
	export default class IconManager {
	    constructor(gl: any, { onUpdate }: {
	        onUpdate?: () => void;
	    });
	    finalize(): void;
	    getTexture(): any;
	    getIconMapping(icon: any): any;
	    setProps({ loadOptions, autoPacking, iconAtlas, iconMapping, data, getIcon }: {
	        loadOptions: any;
	        autoPacking: any;
	        iconAtlas: any;
	        iconMapping: any;
	        data: any;
	        getIcon: any;
	    }): void;
	    get isLoaded(): boolean;
	    _updateIconAtlas(iconAtlas: any): void;
	    _updateAutoPacking(data: any): void;
	    _loadIcons(icons: any): void;
	}

}
declare module '@deck.gl/layers/icon-layer/icon-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class IconLayer extends Layer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState({ oldProps, props, changeFlags }: {
	        oldProps: any;
	        props: any;
	        changeFlags: any;
	    }): void;
	    get isLoaded(): any;
	    finalizeState(): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	    _onUpdate(): void;
	    getInstanceOffset(icon: any): number[];
	    getInstanceColorMode(icon: any): 0 | 1;
	    getInstanceIconFrame(icon: any): any[];
	}

}
declare module '@deck.gl/layers/line-layer/line-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME line-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec3 instanceSourcePositions;\nattribute vec3 instanceTargetPositions;\nattribute vec3 instanceSourcePositions64Low;\nattribute vec3 instanceTargetPositions64Low;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\nattribute float instanceWidths;\n\nuniform float opacity;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\nvarying vec4 vColor;\nvarying vec2 uv;\n\n// offset vector by strokeWidth pixels\n// offset_direction is -1 (left) or 1 (right)\nvec2 getExtrusionOffset(vec2 line_clipspace, float offset_direction, float width) {\n  // normalized direction of the line\n  vec2 dir_screenspace = normalize(line_clipspace * project_uViewportSize);\n  // rotate by 90 degrees\n  dir_screenspace = vec2(-dir_screenspace.y, dir_screenspace.x);\n\n  return dir_screenspace * offset_direction * width / 2.0;\n}\n\nvoid main(void) {\n  geometry.worldPosition = instanceSourcePositions;\n  geometry.worldPositionAlt = instanceTargetPositions;\n\n  // Position\n  vec4 source_commonspace;\n  vec4 target_commonspace;\n  vec4 source = project_position_to_clipspace(instanceSourcePositions, instanceSourcePositions64Low, vec3(0.), source_commonspace);\n  vec4 target = project_position_to_clipspace(instanceTargetPositions, instanceTargetPositions64Low, vec3(0.), target_commonspace);\n\n  // Multiply out width and clamp to limits\n  float widthPixels = clamp(\n    project_size_to_pixel(instanceWidths * widthScale),\n    widthMinPixels, widthMaxPixels\n  );\n  \n  // linear interpolation of source & target to pick right coord\n  float segmentIndex = positions.x;\n  vec4 p = mix(source, target, segmentIndex);\n  geometry.position = mix(source_commonspace, target_commonspace, segmentIndex);\n  uv = positions.xy;\n  geometry.uv = uv;\n  geometry.pickingColor = instancePickingColors;\n\n  // extrude\n  vec3 offset = vec3(\n    getExtrusionOffset(target.xy - source.xy, positions.y, widthPixels),\n    0.0);\n  DECKGL_FILTER_SIZE(offset, geometry);\n  gl_Position = p + vec4(project_pixel_size_to_clipspace(offset.xy), 0.0, 0.0);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  // Color\n  vColor = vec4(instanceColors.rgb, instanceColors.a * opacity);\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/line-layer/line-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME line-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\nvarying vec2 uv;\n\nvoid main(void) {\n  geometry.uv = uv;\n\n  gl_FragColor = vColor;\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/line-layer/line-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class LineLayer extends Layer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	}

}
declare module '@deck.gl/layers/point-cloud-layer/point-cloud-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME point-cloud-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec3 instanceNormals;\nattribute vec4 instanceColors;\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\nuniform float radiusPixels;\n\nvarying vec4 vColor;\nvarying vec2 unitPosition;\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n  geometry.normal = project_normal(instanceNormals);\n\n  // position on the containing square in [-1, 1] space\n  unitPosition = positions.xy;\n  geometry.uv = unitPosition;\n  geometry.pickingColor = instancePickingColors;\n\n  // Find the center of the point and add the current vertex\n  vec3 offset = vec3(positions.xy * radiusPixels, 0.0);\n  DECKGL_FILTER_SIZE(offset, geometry);\n\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.), geometry.position);\n  gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  // Apply lighting\n  vec3 lightColor = lighting_getLightColor(instanceColors.rgb, project_uCameraPosition, geometry.position.xyz, geometry.normal);\n\n  // Apply opacity to instance color, or return instance picking color\n  vColor = vec4(lightColor, instanceColors.a * opacity);\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/point-cloud-layer/point-cloud-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME point-cloud-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\nvarying vec2 unitPosition;\n\nvoid main(void) {\n  geometry.uv = unitPosition;\n\n  float distToCenter = length(unitPosition);\n\n  if (distToCenter > 1.0) {\n    discard;\n  }\n\n  gl_FragColor = vColor;\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/point-cloud-layer/point-cloud-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class PointCloudLayer extends Layer {
	    getShaders(id: any): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	}

}
declare module '@deck.gl/layers/scatterplot-layer/scatterplot-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME scatterplot-layer-vertex-shader\n\nattribute vec3 positions;\n\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute float instanceRadius;\nattribute float instanceLineWidths;\nattribute vec4 instanceFillColors;\nattribute vec4 instanceLineColors;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\nuniform float radiusScale;\nuniform float radiusMinPixels;\nuniform float radiusMaxPixels;\nuniform float lineWidthScale;\nuniform float lineWidthMinPixels;\nuniform float lineWidthMaxPixels;\nuniform float stroked;\nuniform bool filled;\n\nvarying vec4 vFillColor;\nvarying vec4 vLineColor;\nvarying vec2 unitPosition;\nvarying float innerUnitRadius;\nvarying float outerRadiusPixels;\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n\n  // Multiply out radius and clamp to limits\n  outerRadiusPixels = clamp(\n    project_size_to_pixel(radiusScale * instanceRadius),\n    radiusMinPixels, radiusMaxPixels\n  );\n  \n  // Multiply out line width and clamp to limits\n  float lineWidthPixels = clamp(\n    project_size_to_pixel(lineWidthScale * instanceLineWidths),\n    lineWidthMinPixels, lineWidthMaxPixels\n  );\n\n  // outer radius needs to offset by half stroke width\n  outerRadiusPixels += stroked * lineWidthPixels / 2.0;\n\n  // position on the containing square in [-1, 1] space\n  unitPosition = positions.xy;\n  geometry.uv = unitPosition;\n  geometry.pickingColor = instancePickingColors;\n\n  innerUnitRadius = 1.0 - stroked * lineWidthPixels / outerRadiusPixels;\n  \n  vec3 offset = positions * project_pixel_size(outerRadiusPixels);\n  DECKGL_FILTER_SIZE(offset, geometry);\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  // Apply opacity to instance color, or return instance picking color\n  vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * opacity);\n  DECKGL_FILTER_COLOR(vFillColor, geometry);\n  vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * opacity);\n  DECKGL_FILTER_COLOR(vLineColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/scatterplot-layer/scatterplot-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME scatterplot-layer-fragment-shader\n\nprecision highp float;\n\nuniform bool filled;\nuniform float stroked;\n\nvarying vec4 vFillColor;\nvarying vec4 vLineColor;\nvarying vec2 unitPosition;\nvarying float innerUnitRadius;\nvarying float outerRadiusPixels;\n\nvoid main(void) {\n  geometry.uv = unitPosition;\n\n  float distToCenter = length(unitPosition) * outerRadiusPixels;\n  float inCircle = smoothedge(distToCenter, outerRadiusPixels);\n\n  if (inCircle == 0.0) {\n    discard;\n  }\n\n  if (stroked > 0.5) {\n    float isLine = smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter);\n    if (filled) {\n      gl_FragColor = mix(vFillColor, vLineColor, isLine);\n    } else {\n      if (isLine == 0.0) {\n        discard;\n      }\n      gl_FragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);\n    }\n  } else if (filled) {\n    gl_FragColor = vFillColor;\n  } else {\n    discard;\n  }\n\n  gl_FragColor.a *= inCircle;\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/scatterplot-layer/scatterplot-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class ScatterplotLayer extends Layer {
	    getShaders(id: any): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	}

}
declare module '@deck.gl/layers/column-layer/column-geometry' {
	import { Geometry } from '@deck.gl/layers/@luma.gl/core';
	export default class ColumnGeometry extends Geometry {
	    constructor(props?: {});
	}

}
declare module '@deck.gl/layers/column-layer/column-layer-vertex.glsl' {
	 const _default: "\n#define SHADER_NAME column-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec3 normals;\n\nattribute vec3 instancePositions;\nattribute float instanceElevations;\nattribute vec3 instancePositions64Low;\nattribute vec4 instanceFillColors;\nattribute vec4 instanceLineColors;\nattribute float instanceStrokeWidths;\n\nattribute vec3 instancePickingColors;\n\n// Custom uniforms\nuniform float opacity;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform bool extruded;\nuniform bool isStroke;\nuniform float coverage;\nuniform float elevationScale;\nuniform float edgeDistance;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\n// Result\nvarying vec4 vColor;\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n\n  vec4 color = isStroke ? instanceLineColors : instanceFillColors;\n  // rotate primitive position and normal\n  mat2 rotationMatrix = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));\n\n  // calculate elevation, if 3d not enabled set to 0\n  // cylindar gemoetry height are between -1.0 to 1.0, transform it to between 0, 1\n  float elevation = 0.0;\n  // calculate stroke offset\n  float strokeOffsetRatio = 1.0;\n\n  if (extruded) {\n    elevation = instanceElevations * (positions.z + 1.0) / 2.0 * elevationScale;\n  } else if (isStroke) {\n    float widthPixels = clamp(project_size_to_pixel(instanceStrokeWidths * widthScale),\n      widthMinPixels, widthMaxPixels) / 2.0;\n    strokeOffsetRatio += sign(positions.z) * project_pixel_size(widthPixels) / project_size(edgeDistance * coverage * radius);\n  }\n\n  // if alpha == 0.0 or z < 0.0, do not render element\n  float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);\n  float dotRadius = radius * coverage * shouldRender;\n\n  geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));\n  geometry.pickingColor = instancePickingColors;\n\n  // project center of column\n  vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);\n  vec3 centroidPosition64Low = instancePositions64Low;\n  vec3 pos = vec3(project_size(rotationMatrix * positions.xy * strokeOffsetRatio + offset) * dotRadius, 0.);\n  DECKGL_FILTER_SIZE(pos, geometry);\n\n  gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  // Light calculations\n  if (extruded && !isStroke) {\n    vec3 lightColor = lighting_getLightColor(color.rgb, project_uCameraPosition, geometry.position.xyz, geometry.normal);\n    vColor = vec4(lightColor, color.a * opacity);\n  } else {\n    vColor = vec4(color.rgb, color.a * opacity);\n  }\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/column-layer/column-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME column-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_FragColor = vColor;\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/column-layer/column-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	import ColumnGeometry from '@deck.gl/layers/column-layer/column-geometry';
	export default class ColumnLayer extends Layer {
	    getShaders(): any;
	    /**
	     * DeckGL calls initializeState when GL context is available
	     * Essentially a deferred constructor
	     */
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    getGeometry(diskResolution: any, vertices: any): ColumnGeometry;
	    _getModel(gl: any): any;
	    _updateGeometry({ diskResolution, vertices }: {
	        diskResolution: any;
	        vertices: any;
	    }): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	}

}
declare module '@deck.gl/layers/column-layer/grid-cell-layer' {
	import ColumnLayer from '@deck.gl/layers/column-layer/column-layer';
	export default class GridCellLayer extends ColumnLayer {
	    getGeometry(diskResolution: any): any;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	}

}
declare module '@deck.gl/layers/path-layer/path' {
	/** Returns a flat array of path positions
	 * Flattens a nested path object
	 * Cut the feature if needed (globe projection, wrap longitude, etc.)
	 */
	export function normalizePath(path: any, size: any, gridResolution: any, wrapLongitude: any): any;

}
declare module '@deck.gl/layers/path-layer/path-tesselator' {
	import { Tesselator } from '@deck.gl/layers/@deck.gl/core';
	export default class PathTesselator extends Tesselator {
	    constructor(opts: any);
	    getGeometryFromBuffer(buffer: any): any;
	    normalizeGeometry(path: any): any;
	    get(attributeName: any): any;
	    getGeometrySize(path: any): number;
	    updateGeometryAttributes(path: any, context: any): void;
	    _updateSegmentTypes(path: any, context: any): void;
	    _updatePositions(path: any, context: any): void;
	    getPathLength(path: any): number;
	    getPointOnPath(path: any, index: any, target?: any[]): any[];
	    isClosed(path: any): any;
	}

}
declare module '@deck.gl/layers/path-layer/path-layer-vertex.glsl' {
	 const _default: "#define SHADER_NAME path-layer-vertex-shader\n\nattribute vec2 positions;\n\nattribute float instanceTypes;\nattribute vec3 instanceStartPositions;\nattribute vec3 instanceEndPositions;\nattribute vec3 instanceLeftPositions;\nattribute vec3 instanceRightPositions;\nattribute vec3 instanceLeftPositions64Low;\nattribute vec3 instanceStartPositions64Low;\nattribute vec3 instanceEndPositions64Low;\nattribute vec3 instanceRightPositions64Low;\nattribute float instanceStrokeWidths;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\n\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\nuniform float jointType;\nuniform float miterLimit;\nuniform bool billboard;\n\nuniform float opacity;\n\nvarying vec4 vColor;\nvarying vec2 vCornerOffset;\nvarying float vMiterLength;\nvarying vec2 vPathPosition;\nvarying float vPathLength;\n\nconst float EPSILON = 0.001;\nconst vec3 ZERO_OFFSET = vec3(0.0);\n\nfloat flipIfTrue(bool flag) {\n  return -(float(flag) * 2. - 1.);\n}\n\n// calculate line join positions\nvec3 lineJoin(\n  vec3 prevPoint, vec3 currPoint, vec3 nextPoint,\n  vec2 width\n) {\n  bool isEnd = positions.x > 0.0;\n  // side of the segment - -1: left, 0: center, 1: right\n  float sideOfPath = positions.y;\n  float isJoint = float(sideOfPath == 0.0);\n\n  vec3 deltaA3 = (currPoint - prevPoint);\n  vec3 deltaB3 = (nextPoint - currPoint);\n\n  mat3 rotationMatrix;\n  bool needsRotation = !billboard && project_needs_rotation(currPoint, rotationMatrix);\n  if (needsRotation) {\n    deltaA3 = deltaA3 * rotationMatrix;\n    deltaB3 = deltaB3 * rotationMatrix;\n  }\n  vec2 deltaA = deltaA3.xy / width;\n  vec2 deltaB = deltaB3.xy / width;\n\n  float lenA = length(deltaA);\n  float lenB = length(deltaB);\n\n  vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);\n  vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);\n\n  vec2 perpA = vec2(-dirA.y, dirA.x);\n  vec2 perpB = vec2(-dirB.y, dirB.x);\n\n  // tangent of the corner\n  vec2 tangent = dirA + dirB;\n  tangent = length(tangent) > 0. ? normalize(tangent) : perpA;\n  // direction of the corner\n  vec2 miterVec = vec2(-tangent.y, tangent.x);\n  // direction of the segment\n  vec2 dir = isEnd ? dirA : dirB;\n  // direction of the extrusion\n  vec2 perp = isEnd ? perpA : perpB;\n  // length of the segment\n  float L = isEnd ? lenA : lenB;\n\n  // A = angle of the corner\n  float sinHalfA = abs(dot(miterVec, perp));\n  float cosHalfA = abs(dot(dirA, miterVec));\n\n  // -1: right, 1: left\n  float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);\n\n  // relative position to the corner:\n  // -1: inside (smaller side of the angle)\n  // 0: center\n  // 1: outside (bigger side of the angle)\n  float cornerPosition = sideOfPath * turnDirection;\n\n  float miterSize = 1.0 / max(sinHalfA, EPSILON);\n  // trim if inside corner extends further than the line segment\n  miterSize = mix(\n    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),\n    miterSize,\n    step(0.0, cornerPosition)\n  );\n\n  vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))\n    * (sideOfPath + isJoint * turnDirection);\n\n  // special treatment for start cap and end cap\n  bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));\n  bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));\n  bool isCap = isStartCap || isEndCap;\n\n  // extend out a triangle to envelope the round cap\n  if (isCap) {\n    offsetVec = mix(perp * sideOfPath, dir * jointType * 4.0 * flipIfTrue(isStartCap), isJoint);\n  }\n\n  // Generate variables for fragment shader\n  vPathLength = L;\n  vCornerOffset = offsetVec;\n  vMiterLength = dot(vCornerOffset, miterVec * turnDirection);\n  vMiterLength = isCap ? isJoint : vMiterLength;\n\n  vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);\n  vPathPosition = vec2(\n    dot(offsetFromStartOfPath, perp),\n    dot(offsetFromStartOfPath, dir)\n  );\n  geometry.uv = vPathPosition;\n\n  float isValid = step(instanceTypes, 3.5);\n  vec3 offset = vec3(offsetVec * width * isValid, 0.0);\n\n  if (needsRotation) {\n    offset = rotationMatrix * offset;\n  }\n  return currPoint + offset;\n}\n\n// In clipspace extrusion, if a line extends behind the camera, clip it to avoid visual artifacts\nvoid clipLine(inout vec4 position, vec4 refPosition) {\n  if (position.w < EPSILON) {\n    float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);\n    position = refPosition + (position - refPosition) * r;\n  }\n}\n\nvoid main() {\n  geometry.worldPosition = instanceStartPositions;\n  geometry.worldPositionAlt = instanceEndPositions;\n  geometry.pickingColor = instancePickingColors;\n\n  vec2 widthPixels = vec2(clamp(project_size_to_pixel(instanceStrokeWidths * widthScale),\n    widthMinPixels, widthMaxPixels) / 2.0);\n  vec3 width;\n\n  vColor = vec4(instanceColors.rgb, instanceColors.a * opacity);\n\n  float isEnd = positions.x;\n\n  vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);\n  vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);\n\n  vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);\n  vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);\n\n  vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);\n  vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);\n\n  if (billboard) {\n    // Extrude in clipspace\n    vec4 prevPositionScreen = project_position_to_clipspace(prevPosition, prevPosition64Low, ZERO_OFFSET);\n    vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);\n    vec4 nextPositionScreen = project_position_to_clipspace(nextPosition, nextPosition64Low, ZERO_OFFSET);\n\n    clipLine(prevPositionScreen, currPositionScreen);\n    clipLine(nextPositionScreen, currPositionScreen);\n    clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));\n\n    width = vec3(widthPixels, 0.0);\n    DECKGL_FILTER_SIZE(width, geometry);\n\n    vec3 pos = lineJoin(\n      prevPositionScreen.xyz / prevPositionScreen.w,\n      currPositionScreen.xyz / currPositionScreen.w,\n      nextPositionScreen.xyz / nextPositionScreen.w,\n      project_pixel_size_to_clipspace(width.xy)\n    );\n\n    gl_Position = vec4(pos * currPositionScreen.w, currPositionScreen.w);\n  } else {\n    // Extrude in commonspace\n    prevPosition = project_position(prevPosition, prevPosition64Low);\n    currPosition = project_position(currPosition, currPosition64Low);\n    nextPosition = project_position(nextPosition, nextPosition64Low);\n\n    width = vec3(project_pixel_size(widthPixels), 0.0);\n    DECKGL_FILTER_SIZE(width, geometry);\n\n    vec4 pos = vec4(\n      lineJoin(prevPosition, currPosition, nextPosition, width.xy),\n      1.0);\n    geometry.position = pos;\n    gl_Position = project_common_position_to_clipspace(pos);\n  }\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/path-layer/path-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME path-layer-fragment-shader\n\nprecision highp float;\n\nuniform float jointType;\nuniform float miterLimit;\n\nvarying vec4 vColor;\nvarying vec2 vCornerOffset;\nvarying float vMiterLength;\n/*\n * vPathPosition represents the relative coordinates of the current fragment on the path segment.\n * vPathPosition.x - position along the width of the path, between [-1, 1]. 0 is the center line.\n * vPathPosition.y - position along the length of the path, between [0, L / width].\n */\nvarying vec2 vPathPosition;\nvarying float vPathLength;\n\nvoid main(void) {\n  geometry.uv = vPathPosition;\n\n  if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {\n    // if joint is rounded, test distance from the corner\n    if (jointType > 0.0 && length(vCornerOffset) > 1.0) {\n      discard;\n    }\n    // trim miter\n    if (jointType == 0.0 && vMiterLength > miterLimit + 1.0) {\n      discard;\n    }\n  }\n  gl_FragColor = vColor;\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/path-layer/path-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class PathLayer extends Layer {
	    getShaders(): any;
	    get wrapLongitude(): boolean;
	    initializeState(): void;
	    updateState({ oldProps, props, changeFlags }: {
	        oldProps: any;
	        props: any;
	        changeFlags: any;
	    }): void;
	    getPickingInfo(params: any): any;
	    disablePickingIndex(objectIndex: any): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    _getModel(gl: any): any;
	    calculatePositions(attribute: any): void;
	    calculateSegmentTypes(attribute: any): void;
	}

}
declare module '@deck.gl/layers/solid-polygon-layer/polygon' {
	/**
	 * Normalize any polygon representation into the "complex flat" format
	 * @param {Array|Object} polygon
	 * @param {Number} positionSize - size of a position, 2 (xy) or 3 (xyz)
	 * @param {Number} [vertexCount] - pre-computed vertex count in the polygon.
	 *   If provided, will skip counting.
	 * @return {Object} - {positions: <Float64Array>, holeIndices: <Array|null>}
	 */
	export function normalize(polygon: any, positionSize: any): any[] | {
	    positions: any[];
	    holeIndices: any[];
	};
	export function getSurfaceIndices(normalizedPolygon: any, positionSize: any, preproject: any): any;

}
declare module '@deck.gl/layers/solid-polygon-layer/polygon-tesselator' {
	import { Tesselator } from '@deck.gl/layers/@deck.gl/core';
	export default class PolygonTesselator extends Tesselator {
	    constructor(opts: any);
	    get(attributeName: any): any;
	    updateGeometry(opts: any): void;
	    normalizeGeometry(polygon: any): any;
	    getGeometrySize(polygon: any): number;
	    getGeometryFromBuffer(buffer: any): any;
	    updateGeometryAttributes(polygon: any, context: any): void;
	    _updateIndices(polygon: any, { geometryIndex, vertexStart: offset, indexStart }: {
	        geometryIndex: any;
	        vertexStart: any;
	        indexStart: any;
	    }): void;
	    _updatePositions(polygon: any, { vertexStart, geometrySize }: {
	        vertexStart: any;
	        geometrySize: any;
	    }): void;
	    _updateVertexValid(polygon: any, { vertexStart, geometrySize }: {
	        vertexStart: any;
	        geometrySize: any;
	    }): void;
	}

}
declare module '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer-vertex-main.glsl' {
	 const _default: "\nattribute vec2 vertexPositions;\nattribute float vertexValid;\n\nuniform bool extruded;\nuniform bool isWireframe;\nuniform float elevationScale;\nuniform float opacity;\n\nvarying vec4 vColor;\nvarying float isValid;\n\nstruct PolygonProps {\n  vec4 fillColors;\n  vec4 lineColors;\n  vec3 positions;\n  vec3 nextPositions;\n  vec3 pickingColors;\n  vec3 positions64Low;\n  vec3 nextPositions64Low;\n  float elevations;\n};\n\nvec3 project_offset_normal(vec3 vector) {\n  if (project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT ||\n    project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {\n    // normals generated by the polygon tesselator are in lnglat offsets instead of meters\n    return normalize(vector * project_uCommonUnitsPerWorldUnit);\n  }\n  return project_normal(vector);\n}\n\nvoid calculatePosition(PolygonProps props) {\n  vec3 pos;\n  vec3 pos64Low;\n  vec3 normal;\n  vec4 colors = isWireframe ? props.lineColors : props.fillColors;\n\n  geometry.worldPosition = props.positions;\n  geometry.worldPositionAlt = props.nextPositions;\n  geometry.pickingColor = props.pickingColors;\n\n#ifdef IS_SIDE_VERTEX\n  pos = mix(props.positions, props.nextPositions, vertexPositions.x);\n  pos64Low = mix(props.positions64Low, props.nextPositions64Low, vertexPositions.x);\n  isValid = vertexValid;\n#else\n  pos = props.positions;\n  pos64Low = props.positions64Low;\n  isValid = 1.0;\n#endif\n\n  if (extruded) {\n    pos.z += props.elevations * vertexPositions.y * elevationScale;\n\n#ifdef IS_SIDE_VERTEX\n    normal = vec3(\n      props.positions.y - props.nextPositions.y + (props.positions64Low.y - props.nextPositions64Low.y),\n      props.nextPositions.x - props.positions.x + (props.nextPositions64Low.x - props.positions64Low.x),\n      0.0);\n    normal = project_offset_normal(normal);\n#else\n    normal = vec3(0.0, 0.0, 1.0);\n#endif\n    geometry.normal = normal;\n  }\n\n  gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  if (extruded) {\n    vec3 lightColor = lighting_getLightColor(colors.rgb, project_uCameraPosition, geometry.position.xyz, normal);\n    vColor = vec4(lightColor, colors.a * opacity);\n  } else {\n    vColor = vec4(colors.rgb, colors.a * opacity);\n  }\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer-vertex-top.glsl' {
	 const _default: string;
	export default _default;

}
declare module '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer-vertex-side.glsl' {
	 const _default: string;
	export default _default;

}
declare module '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME solid-polygon-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\nvarying float isValid;\n\nvoid main(void) {\n  if (isValid < 0.5) {\n    discard;\n  }\n\n  gl_FragColor = vColor;\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer' {
	import { Layer } from '@deck.gl/layers/@deck.gl/core';
	export default class SolidPolygonLayer extends Layer {
	    getShaders(vs: any): any;
	    get wrapLongitude(): boolean;
	    initializeState(): void;
	    getPickingInfo(params: any): any;
	    disablePickingIndex(objectIndex: any): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    updateState(updateParams: any): void;
	    updateGeometry({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    _getModels(gl: any): {
	        models: any[];
	        topModel: any;
	        sideModel: any;
	    };
	    calculateIndices(attribute: any): void;
	    calculatePositions(attribute: any): void;
	    calculateVertexValid(attribute: any): void;
	}

}
declare module '@deck.gl/layers/utils' {
	export function replaceInRange({ data, getIndex, dataRange, replace }: {
	    data: any;
	    getIndex: any;
	    dataRange: any;
	    replace: any;
	}): {
	    startRow: any;
	    endRow: any;
	};

}
declare module '@deck.gl/layers/polygon-layer/polygon-layer' {
	import { CompositeLayer } from '@deck.gl/layers/@deck.gl/core';
	export default class PolygonLayer extends CompositeLayer {
	    initializeState(): void;
	    updateState({ oldProps, props, changeFlags }: {
	        oldProps: any;
	        props: any;
	        changeFlags: any;
	    }): void;
	    _getPaths(dataRange?: {}): any[];
	    renderLayers(): any[];
	}

}
declare module '@deck.gl/layers/geojson-layer/geojson' {
	/**
	 * "Normalizes" complete or partial GeoJSON data into iterable list of features
	 * Can accept GeoJSON geometry or "Feature", "FeatureCollection" in addition
	 * to plain arrays and iterables.
	 * Works by extracting the feature array or wrapping single objects in an array,
	 * so that subsequent code can simply iterate over features.
	 *
	 * @param {object} geojson - geojson data
	 * @param {Object|Array} data - geojson object (FeatureCollection, Feature or
	 *  Geometry) or array of features
	 * @return {Array|"iteratable"} - iterable list of features
	 */
	export function getGeojsonFeatures(geojson: any): any;
	export function separateGeojsonFeatures(features: any, wrapFeature: any, dataRange?: {}): {
	    pointFeatures: any[];
	    lineFeatures: any[];
	    polygonFeatures: any[];
	    polygonOutlineFeatures: any[];
	};
	export function validateGeometry(type: any, coordinates: any): boolean;

}
declare module '@deck.gl/layers/geojson-layer/geojson-layer' {
	import { CompositeLayer } from '@deck.gl/layers/@deck.gl/core';
	export default class GeoJsonLayer extends CompositeLayer {
	    initializeState(): void;
	    updateState({ props, changeFlags }: {
	        props: any;
	        changeFlags: any;
	    }): void;
	    renderLayers(): any[];
	    _getHighlightedIndex(data: any): any;
	}

}
declare module '@deck.gl/layers/text-layer/multi-icon-layer/multi-icon-layer-fragment.glsl' {
	 const _default: "#define SHADER_NAME multi-icon-layer-fragment-shader\n\nprecision highp float;\n\nuniform float opacity;\nuniform sampler2D iconsTexture;\nuniform float buffer;\nuniform bool sdf;\nuniform float alphaCutoff;\nuniform bool shouldDrawBackground;\nuniform vec3 backgroundColor;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying float vGamma;\nvarying vec2 uv;\n\nvoid main(void) {\n  geometry.uv = uv;\n\n  if (!picking_uActive) {\n    float alpha = texture2D(iconsTexture, vTextureCoords).a;\n\n    // if enable sdf (signed distance fields)\n    if (sdf) {\n      alpha = smoothstep(buffer - vGamma, buffer + vGamma, alpha);\n    }\n\n    // Take the global opacity and the alpha from vColor into account for the alpha component\n    float a = alpha * vColor.a;\n    \n    if (a < alphaCutoff) {\n      // We are now in the background, let's decide what to draw\n      if (shouldDrawBackground) {\n        // draw background color and return if not picking\n        gl_FragColor = vec4(backgroundColor, vColor.a);\n      } else {\n        // no background and no picking\n        discard;\n      }\n    } else {\n      if (shouldDrawBackground) {\n        gl_FragColor = vec4(mix(backgroundColor, vColor.rgb, alpha), vColor.a * opacity);\n      } else {\n        gl_FragColor = vec4(vColor.rgb, a * opacity);\n      }\n      DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n    }\n  } else {\n    DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n  }\n}\n";
	export default _default;

}
declare module '@deck.gl/layers/text-layer/multi-icon-layer/multi-icon-layer' {
	import IconLayer from '@deck.gl/layers/icon-layer/icon-layer';
	export default class MultiIconLayer extends IconLayer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState(updateParams: any): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    getInstanceOffset(icons: any): any[];
	    getInstanceColorMode(icons: any): number;
	    getInstanceIconFrame(icons: any): any[];
	}

}
declare module '@deck.gl/layers/text-layer/utils' {
	export function nextPowOfTwo(number: any): number;
	/**
	 * Generate character mapping table or update from an existing mapping table
	 * @param characterSet {Array|Set} new characters
	 * @param getFontWidth {Function} function to get width of each character
	 * @param fontHeight {Number} height of font
	 * @param buffer {Number} buffer surround each character
	 * @param maxCanvasWidth {Number} max width of font atlas
	 * @param mapping {Object} old mapping table
	 * @param xOffset {Number} x position of last character in old mapping table
	 * @param yOffset {Number} y position of last character in old mapping table
	 * @returns {{
	 *   mapping: Object,
	 *   xOffset: Number, x position of last character
	 *   yOffset: Number, y position of last character in old mapping table
	 *   canvasHeight: Number, height of the font atlas canvas, power of 2
	 *  }}
	 */
	export function buildMapping({ characterSet, getFontWidth, fontHeight, buffer, maxCanvasWidth, mapping, xOffset, yOffset }: {
	    characterSet: any;
	    getFontWidth: any;
	    fontHeight: any;
	    buffer: any;
	    maxCanvasWidth: any;
	    mapping?: {};
	    xOffset?: number;
	    yOffset?: number;
	}): {
	    mapping: {};
	    xOffset: number;
	    yOffset: number;
	    canvasHeight: number;
	};
	export function autoWrapping(text: any, wordBreak: any, maxWidth: any, iconMapping: any): {
	    rows: any[];
	    lastRowStartCharIndex: number;
	    lastRowOffsetLeft: number;
	};
	/**
	 * Transform a text paragraph to an array of characters, each character contains
	 * @param paragraph: {String}
	 * @param iconMapping {Object} character mapping table for retrieving a character from font atlas
	 * @param lineHeight {Number} css line-height
	 * @param wordBreak {String} css word-break option
	 * @param maxWidth {number} css max-width
	 * @param transformedData {Array} output transformed data array, each datum contains
	 *   - text: character
	 *   - index: character index in the paragraph
	 *   - x: x offset in the row,
	 *   - y: y offset in the paragraph
	 *   - size: [width, height] size of the paragraph
	 *   - rowSize: [rowWidth, rowHeight] size of the row
	 *   - len: length of the paragraph
	 */
	export function transformParagraph(paragraph: any, lineHeight: any, wordBreak: any, maxWidth: any, iconMapping: any): {
	    characters: any[];
	    size: number[];
	};
	export function getTextFromBuffer({ value, length, stride, offset, startIndices }: {
	    value: any;
	    length: any;
	    stride: any;
	    offset: any;
	    startIndices: any;
	}): {
	    texts: any[];
	    characterCount: any;
	};

}
declare module '@deck.gl/layers/text-layer/lru-cache' {
	/**
	 * LRU Cache class with limit
	 *
	 * Update order for each get/set operation
	 * Delete oldest when reach given limit
	 */
	export default class LRUCache {
	    constructor(limit?: number);
	    clear(): void;
	    get(key: any): any;
	    set(key: any, value: any): void;
	    delete(key: any): void;
	    _deleteCache(key: any): void;
	    _deleteOrder(key: any): void;
	    _appendOrder(key: any): void;
	}

}
declare module '@deck.gl/layers/text-layer/font-atlas-manager' {
	export const DEFAULT_CHAR_SET: any[];
	export const DEFAULT_FONT_FAMILY = "Monaco, monospace";
	export const DEFAULT_FONT_WEIGHT = "normal";
	export const DEFAULT_FONT_SIZE = 64;
	export const DEFAULT_BUFFER = 2;
	export const DEFAULT_CUTOFF = 0.25;
	export const DEFAULT_RADIUS = 3;
	export default class FontAtlasManager {
	    constructor(gl: any);
	    finalize(): void;
	    get texture(): any;
	    get mapping(): any;
	    get scale(): number;
	    setProps(props?: {}): void;
	    _updateTexture({ data: canvas, width, height }: {
	        data: any;
	        width: any;
	        height: any;
	    }): void;
	    _generateFontAtlas(key: any, characterSet: any, cachedFontAtlas: any): {
	        xOffset: number;
	        yOffset: number;
	        mapping: {};
	        data: any;
	        width: any;
	        height: any;
	    };
	    _getKey(): string;
	}

}
declare module '@deck.gl/layers/text-layer/text-layer' {
	import { CompositeLayer } from '@deck.gl/layers/@deck.gl/core';
	export default class TextLayer extends CompositeLayer {
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    finalizeState(): void;
	    getPickingInfo({ info }: {
	        info: any;
	    }): any;
	    _updateFontAtlas(oldProps: any, props: any): void;
	    _fontChanged(oldProps: any, props: any): boolean;
	    _updateText(): void;
	    getIconOffsets(object: any, objectInfo: any): any[];
	    renderLayers(): any;
	}

}
declare module '@deck.gl/layers' {
	export { default as ArcLayer } from '@deck.gl/layers/arc-layer/arc-layer';
	export { default as BitmapLayer } from '@deck.gl/layers/bitmap-layer/bitmap-layer';
	export { default as IconLayer } from '@deck.gl/layers/icon-layer/icon-layer';
	export { default as LineLayer } from '@deck.gl/layers/line-layer/line-layer';
	export { default as PointCloudLayer } from '@deck.gl/layers/point-cloud-layer/point-cloud-layer';
	export { default as ScatterplotLayer } from '@deck.gl/layers/scatterplot-layer/scatterplot-layer';
	export { default as ColumnLayer } from '@deck.gl/layers/column-layer/column-layer';
	export { default as GridCellLayer } from '@deck.gl/layers/column-layer/grid-cell-layer';
	export { default as PathLayer } from '@deck.gl/layers/path-layer/path-layer';
	export { default as PolygonLayer } from '@deck.gl/layers/polygon-layer/polygon-layer';
	export { default as GeoJsonLayer } from '@deck.gl/layers/geojson-layer/geojson-layer';
	export { default as TextLayer } from '@deck.gl/layers/text-layer/text-layer';
	export { default as SolidPolygonLayer } from '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer';
	export { default as _MultiIconLayer } from '@deck.gl/layers/text-layer/multi-icon-layer/multi-icon-layer';

}
