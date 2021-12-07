import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

export interface UserSession {
  id: number;
  createdAt: string;
  clientIp: string;
  isActive: boolean;
  seenAt: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  var message = 'data:image/png;base64,';

  getBackendSrv()
    .get('/api/user/qr')
    .then(value => {
      message = 'data:image/png;base64, ' + value['data'];
      console.log(message);
      var obj = document.getElementById('qrcodeImg');
      if (obj != null) {
        obj.setAttribute('src', message);
      }
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
      <img src={message} id="qrcodeImg" alt="QR Code" />
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
