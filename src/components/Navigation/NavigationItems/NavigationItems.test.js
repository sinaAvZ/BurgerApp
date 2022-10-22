import React from 'react'
import NavigationItems from './NavigationItems'
import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import NavigationItem from './NavigationItem/NavigationItem'
configure({ adapter: new Adapter() })
describe('<Navigations/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })


    it("Should Be Render Two Navigation", () => {

        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it("Should Be Render three Navigation when is authenticated", () => {
        //    wrapper = shallow(<NavigationItems isAuth/>)
        wrapper.setProps({ isAuth: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it("Should Be Render Logout When Auth Navigation", () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })

})