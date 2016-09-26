import React, {Component, PropTypes} from 'react';
import CodeMirror from 'react-codemirror';
import cx from 'classnames';
import humanize from 'humanize-string';
import classNames from './CodeEditor.scss';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';

class CodeEditor extends Component {
  static defaultProps = {
    value: ''
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    editorClass: PropTypes.string,
    hint: PropTypes.string
  };

  render() {
    const {
            touched,
            invalid,
            label,
            name,
            error,
            onBlur,
            value,
            className,
            editorClass,
            hint,
            ...rest
          } = this.props;

    const options = {
      mode: 'text/html',
      lineNumbers: true,
      allowDropFileTypes: ['text/html', 'text/plain'],
      flattenSpans: false,
      autoCloseTags: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      matchTags: true
    };
    const errorText = Array.isArray(error) ? error[0] : error;
    return (
      <div className={cx('field', className, {error: touched && invalid})}>
        <label>{label || humanize(name)}</label>
        <CodeMirror
          {...rest}
          options={options}
          onFocusChange={() => value && onBlur(value)}
          value={value}
          className={cx(classNames.editor, editorClass)} />
        {hint && !(touched && invalid) && <div className="text grey">{hint}</div>}
        {touched && invalid && <div className="ui basic red pointing prompt label">{errorText}</div>}
      </div>
    );
  }
}

export default CodeEditor;
