import Image from "next/image";

export default function ServiceCard({ service, setSelectedService }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">

        <div className="position-relative" style={{ height: "200px" }}>
          <Image
            src={service.image || "/images/default.png"}
            alt={service.title}
            fill
            className="object-fit-cover"
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">{service.title}</h5>
          <p className="card-text text-muted">
            {service.short_description}
          </p>
        </div>

        <div className="card-footer bg-white border-0">
          <button
            className="btn btn-dark btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#serviceModal"
            onClick={() => setSelectedService(service)}
          >
            Request this service
          </button>
        </div>

      </div>
    </div>
  );
}