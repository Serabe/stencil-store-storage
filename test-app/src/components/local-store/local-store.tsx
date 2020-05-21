import { Component, h } from '@stencil/core';
import { local } from '../../stores/local-storage';

@Component({
  tag: 'local-store',
  shadow: false,
})
export class MyComponent {
  render() {
    return (
      <div>
        <input
          class="string"
          value={local.state.aString}
          onInput={evt => (local.state.aString = evt.target.value)}
        />
        <input
          class="number"
          value={local.state.aNumber}
          onInput={evt => (local.state.aNumber = evt.target.value)}
        />
      </div>
    );
  }
}
