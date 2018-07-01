import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import ImageComponent from '../../src/react-app/ImageComponent';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import ReactJSDOM from 'react-jsdom';
import ImageProblem from '../../src/problem-engine/ImageProblem';

Enzyme.configure({ adapter: new Adapter() });
process.env.NODE_ENV = 'test';

describe('ImageComponent', () => {
    let mountedImageComponent;
    const goalGenerator = function(x, y) {
        return y * 255;
    };
    const otherGenerator = function(x, y) {
        return x * 255;
    };
    const blankGenerator = function(x, y) {
        return 0;
    };

    beforeEach((done) => {
        ImageProblem.create(goalGenerator)
            .then((prob) => {
                return prob.serialize();
            })
            .then((serialized) => {
                let props = {
                    generator: blankGenerator,
                    problem: serialized
                };
                mountedImageComponent = <ImageComponent {...props} />;
                done();
            });
    });

    it('use generator to render new image', (done) => {
        // Create image problem `a` with some generator
        const wrapper = shallow(mountedImageComponent);
        ImageProblem.create(otherGenerator).then((problem) => {
            expect(wrapper.state('target')).not.toEqual(problem.original);
            // Pass that generator as props
            wrapper.setProps({ generator: otherGenerator });
            // Check that the component's target is equal to `a.original`
            setTimeout(() => {
                // to do this without timeout would I believe involve mocking the ImageProblem api
                // https://github.com/airbnb/enzyme/issues/964
                wrapper.update();
                expect(wrapper.state('target')).toEqual(problem.original);
                expect(wrapper.state('done')).toEqual(false);
                done();
            }, 100);
        });
    });

    it('sanity check when passing props', () => {
        const wrapper = shallow(mountedImageComponent);
        const spy = sinon.spy(wrapper.instance(), 'componentDidUpdate');

        expect(spy.calledOnce).toEqual(false);
        wrapper.setProps({ prop: 2 });
        expect(spy.calledOnce).toEqual(true);
    });

    it('when generator produces the correct image, set state to done', (done) => {
        const wrapper = shallow(mountedImageComponent);
        wrapper.setProps({ generator: goalGenerator });
        // Check that the component's target is equal to `a.original`
        setTimeout(() => {
            wrapper.update();
            expect(wrapper.state('done')).toEqual(true);
            done();
        }, 100);
    });
});