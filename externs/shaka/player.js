/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/** @externs */


/**
 * @typedef {{
 *   timestamp: number,
 *   id: number,
 *   type: string,
 *   fromAdaptation: boolean
 * }}
 *
 * @property {number} timestamp
 *   The timestamp the choice was made, in seconds since 1970
 *   (i.e. Date.now() / 1000).
 * @property {number} id
 *   The id of the track that was chosen.
 * @property {string} type
 *   The type of stream chosen ('variant' or 'text')
 * @property {boolean} fromAdaptation
 *   True if the choice was made by AbrManager for adaptation; false if it
 *   was made by the application through selectTrack.
 * @exportDoc
 */
shakaExtern.StreamChoice;


/**
 * @typedef {{
 *   timestamp: number,
 *   state: string,
 *   duration: number
 * }}
 *
 * @property {number} timestamp
 *   The timestamp the state was entered, in seconds since 1970
 *   (i.e. Date.now() / 1000).
 * @property {string} state
 *   The state the player entered.  This could be 'buffering', 'playing',
 *   'paused', or 'ended'.
 * @property {number} duration
 *   The number of seconds the player was in this state.  If this is the last
 *   entry in the list, the player is still in this state, so the duration will
 *   continue to increase.
 * @exportDoc
 */
shakaExtern.StateChange;


/**
 * @typedef {{
 *   width: number,
 *   height: number,
 *   streamBandwidth: number,
 *
 *   decodedFrames: number,
 *   droppedFrames: number,
 *   estimatedBandwidth: number,
 *
 *   loadLatency: number,
 *   playTime: number,
 *   bufferingTime: number,
 *
 *   switchHistory: !Array.<shakaExtern.StreamChoice>,
 *   stateHistory: !Array.<shakaExtern.StateChange>
 * }}
 *
 * @description
 * Contains statistics and information about the current state of the player.
 * This is meant for applications that want to log quality-of-experience (QoE)
 * or other stats.  These values will reset when load() is called again.
 *
 * @property {number} width
 *   The width of the current video track.
 * @property {number} height
 *   The height of the current video track.
 * @property {number} streamBandwidth
 *   The bandwidth required for the current streams (total, in bit/sec).
 *
 * @property {number} decodedFrames
 *   The total number of frames decoded by the Player.  This may be NaN if this
 *   is not supported by the browser.
 * @property {number} droppedFrames
 *   The total number of frames dropped by the Player.  This may be NaN if this
 *   is not supported by the browser.
 * @property {number} estimatedBandwidth
 *   The current estimated network bandwidth (in bit/sec).
 *
 * @property {number} loadLatency
 *   This is the number of seconds it took for the video element to have enough
 *   data to begin playback.  This is measured from the time load() is called to
 *   the time the 'loadeddata' event is fired by the media element.
 * @property {number} playTime
 *   The total time spent in a playing state in seconds.
 * @property {number} bufferingTime
 *   The total time spent in a buffering state in seconds.
 *
 * @property {!Array.<shakaExtern.StreamChoice>} switchHistory
 *   A history of the stream changes.
 * @property {!Array.<shakaExtern.StateChange>} stateHistory
 *   A history of the state changes.
 * @exportDoc
 */
shakaExtern.Stats;


/**
 * @typedef {{
 *   id: number,
 *   active: boolean,
 *
 *   type: string,
 *   bandwidth: number,
 *
 *   language: string,
 *   label: ?string,
 *   kind: ?string,
 *   width: ?number,
 *   height: ?number,
 *   frameRate: ?number,
 *   mimeType: ?string,
 *   codecs: ?string,
 *   audioCodec: ?string,
 *   videoCodec: ?string,
 *   primary: boolean,
 *   roles: !Array.<string>
 * }}
 *
 * @description
 * An object describing a media track.  This object should be treated as
 * read-only as changing any values does not have any effect.  This is the
 * public view of an audio/video paring (variant type) or text track (text
 * type).
 *
 * @property {number} id
 *   The unique ID of the track.
 * @property {boolean} active
 *   If true, this is the track is being streamed (another track may be
 *   visible/audible in the buffer).
 *
 * @property {string} type
 *   The type of track, either 'variant' or 'text'.
 * @property {number} bandwidth
 *   The bandwidth required to play the track, in bits/sec.
 *
 * @property {string} language
 *   The language of the track, or 'und' if not given.  This is the exact
 *   value provided in the manifest; it may need to be normalized.
 * @property {?string} label
 *   The track label, unique text that should describe the track.
 * @property {?string} kind
 *   (only for text tracks) The kind of text track, either 'caption' or
 *   'subtitle'.
 * @property {?number} width
 *   The video width provided in the manifest, if present.
 * @property {?number} height
 *   The video height provided in the manifest, if present.
 * @property {?number} frameRate
 *   The video framerate provided in the manifest, if present.
 * @property {?string} mimeType
 *   The MIME type of the content provided in the manifest.
 * @property {?string} codecs
 *   The audio/video codecs string provided in the manifest, if present.
 * @property {?string} audioCodec
 *   The audio codecs string provided in the manifest, if present.
  * @property {?string} videoCodec
 *   The video codecs string provided in the manifest, if present.
 * @property {boolean} primary
 *   True indicates that this in the primary language for the content.
 *   This flag is based on signals from the manifest.
 *   This can be a useful hint about which language should be the default, and
 *   indicates which track Shaka will use when the user's language preference
 *   cannot be satisfied.
 * @property {!Array.<string>} roles
 *   The roles of the track, e.g. 'main', 'caption', or 'commentary'.
 * @exportDoc
 */
shakaExtern.Track;


/**
 * @typedef {{
 *   minWidth: number,
 *   maxWidth: number,
 *   minHeight: number,
 *   maxHeight: number,
 *   minPixels: number,
 *   maxPixels: number,
 *
 *   minBandwidth: number,
 *   maxBandwidth: number
 * }}
 *
 * @description
 * An object describing application restrictions on what tracks can play.  All
 * restrictions must be fulfilled for a track to be playable.  If a track does
 * not meet the restrictions, it will not appear in the track list and it will
 * not be played.
 *
 * @property {number} minWidth
 *   The minimum width of a video track, in pixels.
 * @property {number} maxWidth
 *   The maximum width of a video track, in pixels.
 * @property {number} minHeight
 *   The minimum height of a video track, in pixels.
 * @property {number} maxHeight
 *   The maximum height of a video track, in pixels.
 * @property {number} minPixels
 *   The minimum number of total pixels in a video track (i.e. width * height).
 * @property {number} maxPixels
 *   The maximum number of total pixels in a video track (i.e. width * height).
 *
 * @property {number} minBandwidth
 *   The minimum bandwidth of a variant track, in bit/sec.
 * @property {number} maxBandwidth
 *   The maximum bandwidth of a variant track, in bit/sec.
 * @exportDoc
 */
shakaExtern.Restrictions;


/**
 * @typedef {{
 *   persistentState: boolean
 * }}
 *
 * @property {boolean} persistentState
 *   Whether this key system supports persistent state.
 */
shakaExtern.DrmSupportType;


/**
 * @typedef {{
 *   manifest: !Object.<string, boolean>,
 *   media: !Object.<string, boolean>,
 *   drm: !Object.<string, ?shakaExtern.DrmSupportType>
 * }}
 *
 * @description
 * An object detailing browser support for various features.
 *
 * @property {!Object.<string, boolean>} manifest
 *   A map of supported manifest types.
 *   The keys are manifest MIME types and file extensions.
 * @property {!Object.<string, boolean>} media
 *   A map of supported media types.
 *   The keys are media MIME types.
 * @property {!Object.<string, ?shakaExtern.DrmSupportType>} drm
 *   A map of supported key systems.
 *   The keys are the key system names.  The value is null if it is not
 *   supported.  Key systems not probed will not be in this dictionary.
 *
 * @exportDoc
 */
shakaExtern.SupportType;


/**
 * @typedef {{
 *   schemeIdUri: string,
 *   value: string,
 *   startTime: number,
 *   endTime: number,
 *   id: string,
 *   eventElement: Element
 * }}
 *
 * @description
 * Contains information about a region of the timeline that will cause an event
 * to be raised when the playhead enters or exits it.  In DASH this is the
 * EventStream element.
 *
 * @property {string} schemeIdUri
 *   Identifies the message scheme.
 * @property {string} value
 *   Specifies the value for the region.
 * @property {number} startTime
 *   The presentation time (in seconds) that the region should start.
 * @property {number} endTime
 *   The presentation time (in seconds) that the region should end.
 * @property {string} id
 *   Specifies an identifier for this instance of the region.
 * @property {Element} eventElement
 *   The XML element that defines the Event.
 */
shakaExtern.TimelineRegionInfo;


/**
 * @typedef {{
 *   schemeIdUri: string,
 *   value: string,
 *   startTime: number,
 *   endTime: number,
 *   timescale: number,
 *   presentationTimeDelta: number,
 *   eventDuration: number,
 *   id: number,
 *   messageData: Uint8Array
 * }}
 *
 * @description
 * Contains information about an EMSG MP4 box.
 *
 * @property {string} schemeIdUri
 *   Identifies the message scheme.
 * @property {string} value
 *   Specifies the value for the event.
 * @property {number} startTime
 *   The time that the event starts (in presentation time).
 * @property {number} endTime
 *   The time that the event ends (in presentation time).
 * @property {number} timescale
 *   Provides the timescale, in ticks per second.
 * @property {number} presentationTimeDelta
 *   The offset that the event starts, relative to the start of the segment
 *   this is contained in (in units of timescale).
 * @property {number} eventDuration
 *   The duration of the event (in units of timescale).
 * @property {number} id
 *   A field identifying this instance of the message.
 * @property {Uint8Array} messageData
 *   Body of the message.
 * @exportDoc
 */
shakaExtern.EmsgInfo;


/**
 * @typedef {function(!Element):Array.<shakaExtern.DrmInfo>}
 * @see shakaExtern.DashManifestConfiguration
 * @exportDoc
 */
shakaExtern.DashContentProtectionCallback;


/**
 * @typedef {{
 *   distinctiveIdentifierRequired: boolean,
 *   persistentStateRequired: boolean,
 *   videoRobustness: string,
 *   audioRobustness: string,
 *   serverCertificate: Uint8Array
 * }}
 *
 * @property {boolean} distinctiveIdentifierRequired
 *   <i>Defaults to false.</i> <br>
 *   True if the application requires the key system to support distinctive
 *   identifiers.
 * @property {boolean} persistentStateRequired
 *   <i>Defaults to false.</i> <br>
 *   True if the application requires the key system to support persistent
 *   state, e.g., for persistent license storage.
 * @property {string} videoRobustness
 *   A key-system-specific string that specifies a required security level for
 *   video.
 *   <i>Defaults to '', i.e., no specific robustness required.</i> <br>
 * @property {string} audioRobustness
 *   A key-system-specific string that specifies a required security level for
 *   audio.
 *   <i>Defaults to '', i.e., no specific robustness required.</i> <br>
 * @property {Uint8Array} serverCertificate
 *   <i>Defaults to null, i.e., certificate will be requested from the license
 *   server if required.</i> <br>
 *   A key-system-specific server certificate used to encrypt license requests.
 *   Its use is optional and is meant as an optimization to avoid a round-trip
 *   to request a certificate.
 *
 * @exportDoc
 */
shakaExtern.AdvancedDrmConfiguration;


/**
 * @typedef {{
 *   retryParameters: shakaExtern.RetryParameters,
 *   servers: !Object.<string, string>,
 *   clearKeys: !Object.<string, string>,
 *   delayLicenseRequestUntilPlayed: boolean,
 *   advanced: Object.<string, shakaExtern.AdvancedDrmConfiguration>
 * }}
 *
 * @property {shakaExtern.RetryParameters} retryParameters
 *   Retry parameters for license requests.
 * @property {!Object.<string, string>} servers
 *   <i>Required for all but the clear key CDM.</i> <br>
 *   A dictionary which maps key system IDs to their license servers.
 *   For example, {'com.widevine.alpha': 'http://example.com/drm'}.
 * @property {!Object.<string, string>} clearKeys
 *   <i>Forces the use of the Clear Key CDM.</i>
 *   A map of key IDs (hex) to keys (hex).
 * @property {boolean} delayLicenseRequestUntilPlayed
 *   <i>Defaults to false.</i> <br>
 *   True to configure drm to delay sending a license request until a user
 *   actually starts playing content.
 * @property {Object.<string, shakaExtern.AdvancedDrmConfiguration>} advanced
 *   <i>Optional.</i> <br>
 *   A dictionary which maps key system IDs to advanced DRM configuration for
 *   those key systems.
 *
 * @exportDoc
 */
shakaExtern.DrmConfiguration;


/**
 * @typedef {{
 *   customScheme: shakaExtern.DashContentProtectionCallback,
 *   clockSyncUri: string,
 *   ignoreDrmInfo: boolean,
 *   xlinkFailGracefully: boolean
 * }}
 *
 * @property {shakaExtern.DashContentProtectionCallback} customScheme
 *   If given, invoked by a DASH manifest parser to interpret custom or
 *   non-standard DRM schemes found in the manifest.  The argument is a
 *   ContentProtection node.  Return null if not recognized.
 * @property {string} clockSyncUri
 *   A default clock sync URI to be used with live streams which do not
 *   contain any clock sync information.  The "Date" header from this URI
 *   will be used to determine the current time.
 * @property {boolean} ignoreDrmInfo
 *   If true will cause DASH parser to ignore DRM information specified
 *   by the manifest and treat it as if it signaled no particular key
 *   system and contained no init data. Defaults to false if not provided.
 * @property {boolean} xlinkFailGracefully
 *   If true, xlink-related errors will result in a fallback to the tag's
 *   existing contents. If false, xlink-related errors will be propagated
 *   to the application and will result in a playback failure. Defaults to
 *   false if not provided.
 *
 * @exportDoc
 */
shakaExtern.DashManifestConfiguration;


/**
 * @typedef {{
 *   defaultTimeOffset: number
 * }}
 *
 * @property {number} defaultTimeOffset
 *   Default time offset (in seconds) for hls content used when no offset
 *   is specified by the manifest. Defaults to 0 if not provided.
 *   NOTE: Default time offset for Apple encoded content is 10 seconds.
 *
 * @exportDoc
 */
shakaExtern.HlsManifestConfiguration;


/**
 * @typedef {{
 *   retryParameters: shakaExtern.RetryParameters,
 *   dash: shakaExtern.DashManifestConfiguration,
 *   hls: shakaExtern.HlsManifestConfiguration
 * }}
 *
 * @property {shakaExtern.RetryParameters} retryParameters
 *   Retry parameters for manifest requests.
 * @property {shakaExtern.DashManifestConfiguration} dash
 *   Advanced parameters used by the DASH manifest parser.
 * @property {shakaExtern.HlsManifestConfiguration} hls
 *   Advanced parameters used by the HLS manifest parser.
 *
 * @exportDoc
 */
shakaExtern.ManifestConfiguration;


/**
 * @typedef {{
 *   retryParameters: shakaExtern.RetryParameters,
 *   rebufferingGoal: number,
 *   bufferingGoal: number,
 *   bufferBehind: number,
 *   ignoreTextStreamFailures: boolean,
 *   startAtSegmentBoundary: boolean,
 *   smallGapLimit: number,
 *   jumpLargeGaps: boolean
 * }}
 *
 * @description
 * The StreamingEngine's configuration options.
 *
 * @property {shakaExtern.RetryParameters} retryParameters
 *   Retry parameters for segment requests.
 * @property {number} rebufferingGoal
 *   The minimum number of seconds of content that the StreamingEngine must
 *   buffer before it can begin playback or can continue playback after it has
 *   entered into a buffering state (i.e., after it has depleted one more
 *   more of its buffers).
 * @property {number} bufferingGoal
 *   The number of seconds of content that the StreamingEngine will attempt to
 *   buffer ahead of the playhead. This value must be greater than or equal to
 *   the rebuffering goal.
 * @property {number} bufferBehind
 *   The maximum number of seconds of content that the StreamingEngine will keep
 *   in buffer behind the playhead when it appends a new media segment.
 *   The StreamingEngine will evict content to meet this limit.
 * @property {boolean} ignoreTextStreamFailures
 *   If true, the player will ignore text stream failures and proceed to play
 *   other streams.
 * @property {boolean} startAtSegmentBoundary
 *   If true, adjust the start time backwards so it is at the start of a
 *   segment. This affects both explicit start times and calculated start time
 *   for live streams. This can put us further from the live edge. Defaults to
 *   false.
 * @property {number} smallGapLimit
 *   The limit (in seconds) for a gap in the media to be considered "small".
 *   Small gaps are jumped automatically without events.  Large gaps result
 *   in a Player event and can be jumped.
 * @property {boolean} jumpLargeGaps
 *   If true, jump large gaps in addition to small gaps.  The event will be
 *   raised first.  Then, if the app doesn't call preventDefault() on the event,
 *   the Player will jump the gap.  If false, then the event will be raised,
 *   but the gap will not be jumped.
 * @exportDoc
 */
shakaExtern.StreamingConfiguration;


/**
 * @typedef {{
 *   manager: shakaExtern.AbrManager,
 *   enabled: boolean,
 *   defaultBandwidthEstimate: number,
 *   restrictions: shakaExtern.Restrictions
 * }}
 *
 * @property {shakaExtern.AbrManager} manager
 *   The AbrManager instance.
 * @property {boolean} enabled
 *   If true, enable adaptation by the current AbrManager.  Defaults to true.
 * @property {number} defaultBandwidthEstimate
 *   The default bandwidth estimate to use if there is not enough data, in
 *   bit/sec.
 * @property {shakaExtern.Restrictions} restrictions
 *   The restrictions to apply to ABR decisions.  The AbrManager will not
 *   choose any streams that do not meet these restrictions.  (Note that
 *   they can still be chosen by the application)
 * @exportDoc
 */
shakaExtern.AbrConfiguration;


/**
 * @typedef {{
 *   drm: shakaExtern.DrmConfiguration,
 *   manifest: shakaExtern.ManifestConfiguration,
 *   streaming: shakaExtern.StreamingConfiguration,
 *   abr: shakaExtern.AbrConfiguration,
 *   preferredAudioLanguage: string,
 *   preferredTextLanguage: string,
 *   restrictions: shakaExtern.Restrictions
 * }}
 *
 * @property {shakaExtern.DrmConfiguration} drm
 *   DRM configuration and settings.
 * @property {shakaExtern.ManifestConfiguration} manifest
 *   Manifest configuration and settings.
 * @property {shakaExtern.StreamingConfiguration} streaming
 *   Streaming configuration and settings.
 * @property {shakaExtern.AbrConfiguration} abr
 *   ABR configuration and settings.
 * @property {string} preferredAudioLanguage
 *   The preferred language to use for audio tracks.  If not given it will use
 *   the 'main' track.
 *   Changing this during playback will not affect the current playback.
 * @property {string} preferredTextLanguage
 *   The preferred language to use for text tracks.  If a matching text track
 *   is found, and the selected audio and text tracks have different languages,
 *   the text track will be shown.
 *   Changing this during playback will not affect the current playback.
 * @property {shakaExtern.Restrictions} restrictions
 *   The application restrictions to apply to the tracks.  The track must
 *   meet all the restrictions to be playable.
 * @exportDoc
 */
shakaExtern.PlayerConfiguration;
