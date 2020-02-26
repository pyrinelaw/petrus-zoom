import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Content from './content';
import { checkIsTarget } from './utils';

// 默认设置选项
const DEFAULT_OPTIONS = {
    scale: 100, // 缩放倍数, js 加减的时候存在小数不正常的情况，为了避免此情况使用100的倍数来控制
    // 偏移位置控制
    position: {
        x: 0, // x 轴偏移像素
        y: 0, // y 轴偏移像素
    },
};

class Zoom extends React.Component {
    static propTypes = {
        defaultOptions: PropTypes.object, // 默认设置选项
        className: PropTypes.string, // 传入样式名
        style: PropTypes.object, // 传入样式
    };

    static defaultProps = {
        defaultOptions: DEFAULT_OPTIONS,
        className: '',
        style: null,
    };

    // 正常的做法都是会放到 static 中，目前 eslint 并不允许这样使用，相应配置需要屏蔽
    // 目前还没有找到对应配置项
    // static Content = Content;

    constructor(props) {
        super(props);
        this.state = {
            options: { ...DEFAULT_OPTIONS, ...(props.defaultOptions || {}) },
        };
    }

    /**
     * 按步骤缩放，如果填入负数，则会缩小
     */
    onZoomStep = (stepValue) => {
        const { options } = this.state;
        const { scale = 100 } = options;
        const newScale = scale + (window.parseInt(stepValue) || 0);

        if (newScale <= 0) return;

        this.setState({
            options: {
                ...options,
                scale: newScale,
            },
        });
    };

    onZoomTo = (value) => {
        if (!(value > 0)) return;

        const { options } = this.state;
        const { scale = 100 } = options;
        const newScale = window.parseInt(value) || scale;

        this.setState({
            options: {
                ...options,
                scale: newScale,
            },
        });
    };

    onPositionTo = (position) => {
        const { options } = this.state;
        this.setState({
            options: {
                ...options,
                position: position || options.position,
            },
        });
    };

    onReset = () => {
        this.setState({
            options: {
                ...DEFAULT_OPTIONS,
                ...(this.props.defaultOptions || {}),
            },
        });
    };

    renderContent = (dom) => {
        const { options } = this.state;
        return <Content {...dom.props} options={options} onPositionTo={this.onPositionTo} />;
    };

    renderChildren = () => {
        const { options } = this.state;
        const { children } = this.props;
        const childrenDom = typeof children == 'function'
            && children({
                options,
                onZoomStep: this.onZoomStep,
                onZoomTo: this.onZoomTo,
                onPositionTo: this.onPositionTo,
                onReset: this.onReset,
            });
        const childrenList = get(childrenDom, 'props.children') || childrenDom || [];

        const list = childrenList.map((child, index) => {
            if (checkIsTarget(child, Content)) {
                return (
                    <React.Fragment key={`zoom-child-${index}`}>
                        {this.renderContent(child)}
                    </React.Fragment>
                );
            }
            return <React.Fragment key={`zoom-child-${index}`}>{child}</React.Fragment>;
        });

        return list;
    };

    render() {
        const { className, style } = this.props;
        return (
            <div
                className={`mei-components-zoom ${className ? (` ${className}`) : ''}`}
                style={style || {}}
            >
                {this.renderChildren()}
            </div>
        );
    }
}

Zoom.Content = Content;

export default Zoom;
