import { UserStateModel } from './user.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
import { AddEmail, AddId, AddArtistId } from './user.action';


export const initialState: UserStateModel = {
    email: '',
    id:'',
    artist_id: ''
  };

  @State<UserStateModel>({
    name: 'userState',
    defaults: initialState
  })

  export class UserState {

    @Action(AddId)
    addId(ctx: StateContext<UserStateModel>, action: AddId) {
      ctx.setState(
        produce(ctx.getState(), draft => {
          draft.id = action.id;
        }),
      );
    }

    @Action(AddEmail)
    addEmail(ctx: StateContext<UserStateModel>, action: AddEmail) {
      ctx.setState(
        produce(ctx.getState(), draft => {
          draft.email = action.email;
        }),
      );
    }

    @Action(AddArtistId)
    addArtistId(ctx: StateContext<UserStateModel>, action: AddArtistId) {
      ctx.setState(
        produce(ctx.getState(), draft => {
          draft.artist_id = action.id;
        }),
      );
    }
  }