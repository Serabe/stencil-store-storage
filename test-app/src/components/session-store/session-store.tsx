import { Component, h } from '@stencil/core';
import { session } from '../../stores/session-storage';

@Component({
  tag: 'session-store',
  shadow: false,
})
export class MyComponent {
  render() {
    return (
      <div>
        <input
          class="string"
          value={session.state.aString}
          onInput={evt => (session.state.aString = evt.target.value)}
        />
        <input
          class="number"
          value={session.state.aNumber}
          onInput={evt => (session.state.aNumber = evt.target.value)}
        />
      </div>
    );
  }
}
