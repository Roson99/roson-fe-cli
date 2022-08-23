import React, { ErrorInfo } from 'react';
import { withTranslation } from 'react-i18next';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

type Props = {
  t: () => void;
  children: React.ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <Result
          className="oocard inherit_H"
          icon={<SmileOutlined />}
          title={<h1>{t('common.error_tip')}</h1>}
          subTitle={
            <span style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString?.()}</span>
          }
          extra={
            <Button
              type="primary"
              size="large"
              style={{ width: 300 }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              {t('common.retry')}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
