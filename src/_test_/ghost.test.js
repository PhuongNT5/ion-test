import React from "react";
import { shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { create} from 'react-test-renderer'
configure({adapter: new Adapter()});
// describle('test button', function() {
  test('it shows the expected text when clicked', function() {
    function Button(props) {
      return <button>Nothing to do for now</button>;
    }
    
    const button = create(<Button/>);
    expect(button.toJSON()).toMatchSnapshot();
    // const clickFn = jest.fn();
    // const btn = shallow(
    //   <button handleClick={clickFn}>Start</button>
    // )
    // btn.simulate('click');
    // expect(clickFn).toHaveBeenCalled();

  })
// })
