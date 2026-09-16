import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Media } from "../types/media";

export default function PortfolioHero({
  item,
  onMore,
}: {
  item: Media;
  onMore?: () => void;
}) {
  return (
    <section className="nf-billboard" aria-label="대표 프로젝트">
      <img
        className="nf-billboard-image"
        src={item.backdrop ?? item.thumb}
        alt=""
        fetchPriority="high"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/covers/ssfinder.jpg";
        }}
      />
      <div className="nf-billboard-shade" />
      <div className="nf-billboard-copy">
        <div className="nf-original">
          <span>M</span> ORIGINAL PROJECT
        </div>
        <h1 className="nf-feature-title">
          숨숨<span>파인더</span>
        </h1>
        <p className="nf-feature-line">흩어진 기록, 하나의 연결.</p>
        <p className="nf-feature-description">
          공공데이터 수집부터 검색과 매칭까지.
          <br />
          유실물 데이터를 연결하는 백엔드의 이야기가 시작됩니다.
        </p>
        <div className="nf-hero-actions">
          <Link
            className="nf-button nf-button-light"
            to={item.href ?? "/projects"}
          >
            <Play fill="currentColor" size={25} />
            프로젝트 보기
          </Link>
          <button className="nf-button nf-button-muted" onClick={onMore}>
            <Info size={25} />
            상세 정보
          </button>
        </div>
      </div>
      <span className="nf-billboard-category">BACKEND</span>
    </section>
  );
}
