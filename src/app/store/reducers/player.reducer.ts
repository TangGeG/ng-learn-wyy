import { PlayMode } from "src/app/share/wy-ui/wy-player/player-types";
import { Song } from "src/app/service/types/common";
import { createReducer, on, Action } from "@ngrx/store";
import {
  SetPlaying,
  SetPlayList,
  SetSongList,
  SetCurrentIndex,
  SetPlayMode
} from "../actions/player.action";

export type PlayState = {
  // 是否正在播放
  playing: boolean;
  // 播放模式
  playMode: PlayMode;
  // 歌曲列表
  songList: Song[];
  // 播放列表
  playList: Song[];
  // 当前正在播放的索引
  currentIndex: number;
};

export const initialState: PlayState = {
  playing: false,
  playMode: { type: "loop", name: "循环" },
  songList: [],
  playList: [],
  currentIndex: -1
};

const reducer = createReducer(
  initialState,
  on(SetPlaying, (state, { playing }) => ({
    ...state,
    playing
  })),
  on(SetPlayList, (state, { playList }) => ({
    ...state,
    playList
  })),
  on(SetSongList, (state, { songList }) => ({
    ...state,
    songList
  })),
  on(SetPlayMode, (state, { playMode }) => ({
    ...state,
    playMode
  })),
  on(SetCurrentIndex, (state, { currentIndex }) => ({
    ...state,
    currentIndex
  }))
);

export function playerReducer(state: PlayState, action: Action) {
  return reducer(state, action);
}
