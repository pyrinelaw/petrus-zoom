import React from 'react';
import PropTypes from 'prop-types';


let MOVE_TIME = 0; // 当前移动时间戳

export default class Content extends React.Component {
    static propTypes = {
        className: PropTypes.string, // 传入样式名
        style: PropTypes.object, // 传入样式
        options: PropTypes.object, // 默认设置选项
        justifyContent: PropTypes.string, // 对齐方式, 参数与 css 中 justify-content 保持一致
        transformOrigin: PropTypes.string, // 缩放便宜基点，参数与 css 中 transform-origin 保持一致
    };

    static defaultProps = {
        className: '',
        style: null,
        options: null,
        justifyContent: 'center', // 对齐方式：默认居中
        transformOrigin: 'center',
    };

    constructor(props) {
        super(props);
        this.state = {
            startPosition: null, // 拖动起始点
        };
    }

    componentDidMount() {
        document.body.addEventListener('mousemove', this.onMove);
        document.body.addEventListener('mouseup', this.onMoveEnd);
    }

    componentWillUnmount() {
        console.warn('要卸载了');
        document.body.removeEventListener('mousemove', this.onMove);
        document.body.removeEventListener('mouseup', this.onMoveEnd);
    }

    onPositionTo = (e, isMoveEnd = false) => {
        const { options, onPositionTo } = this.props;
        const { position } = options;
        const { startPosition } = this.state;

        if (!startPosition) return;

        if (!isMoveEnd) {
            const timeStamp = new Date().getTime();

            // 为了避免频繁的移动，不断渲染造成性能问题，每两次移动间隔在一定的时间
            if (timeStamp - MOVE_TIME <= 50) {
                return;
            }

            MOVE_TIME = timeStamp;
        }

        onPositionTo
            && onPositionTo({
                x: position.x + window.parseInt(e.pageX - startPosition.x),
                y: position.y + window.parseInt(e.pageY - startPosition.y),
            });

        this.setState({
            startPosition: isMoveEnd
                ? null
                : {
                    x: window.parseInt(e.pageX),
                    y: window.parseInt(e.pageY),
                },
        });
    };

    onMoveStart = (e) => {
        const { startPosition } = this.state;
        if (startPosition) {
            this.setState({
                startPosition: null,
            });
        } else {
            MOVE_TIME = new Date().getTime();
            this.setState({
                startPosition: {
                    x: e.pageX,
                    y: e.pageY,
                },
            });
        }
    };

    onMove = (e) => {
        this.onPositionTo(e);
    };

    onMoveEnd = (e) => {
        this.onPositionTo(e, true);
    };

    render() {
        const {
            children, options, justifyContent, transformOrigin, className, style = {},
        } = this.props;
        const { position, scale = 100 } = options;
        const transform = `translate(${position.x || 0}px, ${position.y || 0}px) scale(${window.parseInt(scale)
            / 100})`;

        return (
            <div
                className={`mei-components-zoom-content ${className ? ` ${className}` : ''}`}
                style={{
                    ...style,
                    justifyContent: justifyContent || 'center',
                }}
                onMouseDown={this.onMoveStart}
                // onMouseMove={this.onMove}
                // onMouseUp={this.onMoveEnd}
            >
                <div
                    className="mei-components-zoom-content__wrap"
                    style={{
                        transformOrigin,
                        transform,
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }
}
