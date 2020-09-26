export interface ActionState {
  priority: number;
  state: string;
}
class State {
  SUCCESS: ActionState = {
    priority: 30,
    state: 'success',
  };
  LOADING: ActionState = {
    priority: 40,
    state: 'loading',
  };
  PENDING: ActionState = {
    priority: 50,
    state: 'pending'
  };
  FAILED: ActionState = {
    priority: 60,
    state: 'failed',
  };
}

export const actionState = new State();

