import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { useCookies } from 'react-cookie';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  // const theme = useTheme();
  const styles = getStyles();
  var QRCode = require('qrcode');
  var message = 'test-messge';
  const [cookies] = useCookies();
  var text = 'URL:' + window.location.host + '\nUSER:\nTOKEN:';
  for (const c in cookies) {
    const v = cookies[c];
    text = text + v;
  }

  QRCode.toDataURL(text, function(err: any, url: string) {
    message = url;
    // console.log(url);
  });

  return (
    <div
      id="qrcodePanel"
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      {text}
      <img src={message} alt="QR Code" />
      <canvas
        id="qrcode"
        className={cx(
          styles.wrapper,
          css`
            width: 200px;
            height: 200px;
            margin-top: 15px;
          `
        )}
      ></canvas>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
